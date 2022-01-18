/* global CONFIG */

// https://developers.google.com/calendar/api/v3/reference/events/list
(function() {
  // Initialization
  const calendar = {
    orderBy     : 'startTime',
    showLocation: false,
    offsetMax   : 72,
    offsetMin   : 4,
    showDeleted : false,
    singleEvents: true,
    maxResults  : 250
  };

  // Read config form theme config file
  Object.assign(calendar, CONFIG.calendar);

  const now = new Date();
  const timeMax = new Date();
  const timeMin = new Date();

  timeMax.setHours(now.getHours() + calendar.offsetMax);
  timeMin.setHours(now.getHours() - calendar.offsetMin);

  // Build URL
  const params = {
    key         : calendar.api_key,
    orderBy     : calendar.orderBy,
    timeMax     : timeMax.toISOString(),
    timeMin     : timeMin.toISOString(),
    showDeleted : calendar.showDeleted,
    singleEvents: calendar.singleEvents,
    maxResults  : calendar.maxResults
  };

  const request_url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendar.calendar_id}/events`);
  Object.entries(params).forEach(param => request_url.searchParams.append(...param));

  function getRelativeTime(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let elapsed = current - previous;
    const tense = elapsed > 0 ? ' ago' : ' later';

    elapsed = Math.abs(elapsed);

    if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes' + tense;
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours' + tense;
    } else if (elapsed < msPerMonth) {
      return 'about ' + Math.round(elapsed / msPerDay) + ' days' + tense;
    } else if (elapsed < msPerYear) {
      return 'about ' + Math.round(elapsed / msPerMonth) + ' months' + tense;
    }

    return 'about ' + Math.round(elapsed / msPerYear) + ' years' + tense;
  }

  function buildEventDOM(tense, event, start, end) {
    const durationFormat = {
      weekday: 'short',
      hour   : '2-digit',
      minute : '2-digit'
    };
    const relativeTime = tense === 'now' ? 'NOW' : getRelativeTime(now, start);
    const duration = start.toLocaleTimeString([], durationFormat) + ' - ' + end.toLocaleTimeString([], durationFormat);

    let location = '';
    if (calendar.showLocation && event.location) {
      location = `<span class="event-location event-details">${event.location}</span>`;
    }
    let description = '';
    if (event.description) {
      description = `<span class="event-description event-details">${event.description}</span>`;
    }

    const eventContent = `<section class="event event-${tense}">
        <h2 class="event-summary">
          ${event.summary}
          <span class="event-relative-time">${relativeTime}</span>
        </h2>
        ${location}
        <span class="event-duration event-details">${duration}</span>
        ${description}
      </section>`;
    return eventContent;
  }

  function fetchData() {
    const eventList = document.querySelector('.event-list');
    if (!eventList) return;

    fetch(request_url.href).then(response => {
      return response.json();
    }).then(data => {
      if (data.items.length === 0) {
        eventList.innerHTML = '<hr>';
        return;
      }
      // Clean the event list
      eventList.innerHTML = '';
      let prevEnd = 0; // used to decide where to insert an <hr>
      const utc = new Date().getTimezoneOffset() * 60000;

      data.items.forEach(event => {
        // Parse data
        const start = new Date(event.start.dateTime || (new Date(event.start.date).getTime() + utc));
        const end = new Date(event.end.dateTime || (new Date(event.end.date).getTime() + utc));

        let tense = 'now';
        if (end < now) {
          tense = 'past';
        } else if (start > now) {
          tense = 'future';
        }

        if (tense === 'future' && prevEnd < now) {
          eventList.innerHTML += '<hr>';
        }

        eventList.innerHTML += buildEventDOM(tense, event, start, end);
        prevEnd = end;
      });
    });
  }

  fetchData();
  const fetchDataTimer = setInterval(fetchData, 60000);
  document.addEventListener('pjax:send', () => {
    clearInterval(fetchDataTimer);
  });
})();
