(function(w, undefined) {
  var firstNames = ['Elodia', 'Sephnie', 'Maxine', 'Claudine', 'Londa', 'Gwyn', 'Consuelo', 'Mariko', 'Lashanda', 'Jesusa', 'Bernie', 'Annamaria', 'Muriel', 'Nikia', 'Margene', 'Lorraine', 'Annemarie', 'Rayna', 'Anonina', 'Carie', 'Gran', 'Jua', 'Jacqulyn', 'Whiney', 'Renaa', 'Usha', 'Annea', 'Jack', 'Chun', 'Eddy', 'Isidra', 'Myesha', 'Ami', 'Easer', 'Karon', 'Granville', 'Maria', 'Shenia', 'Solomon', 'Marquia', 'Charles', 'Neie', 'Beariz', 'Humbero', 'Rigobero', 'Lamon', 'Rivka', 'Phoebe', 'Renea', 'Celia', 'Shay', 'Sanford', 'Gwen', 'Lizzee', 'Lucila', 'Alice', 'Lauri', 'Desmond', 'Raeann', 'Rona', 'Jason', 'Lilian', 'Karena', 'Dennise', 'Delana', 'Rheba', 'Doy', 'Dolly', 'Venice', 'Dalene', 'Cyndy', 'Ilona', 'Lakeshia', 'Laurena', 'Lorriane', 'Kaci', 'Velve', 'Maple', 'Maire', 'Marline', 'Bar', 'Nelly', 'Shona', 'Karole', 'Judi', 'Ardelia', 'Alonzo', 'Junie', 'Alvina', 'Ilda'];
  var lastNames = ['Ortego', 'Landa', 'Piermarini', 'Valles', 'Lusher', 'Branco', 'Falls', 'Hallett', 'Nicley', 'Cambareri', 'Han', 'Edwin', 'Lan', 'Dauenhauer', 'Cerrone', 'Matsumura', 'Mosher', 'Dragoo', 'Robare', 'Judon', 'Kyger', 'Bonk', 'Mcgaughy', 'Mcfetridge', 'Maxton', 'Roling', 'Klotz', 'Boudreaux', 'Hayton', 'Leonardo', 'Schug', 'Dewitt', 'Wohlwend', 'Hoos', 'Pennock', 'Sprinkle', 'Weick', 'Gilliland', 'Resler', 'Badgett', 'Bittinger', 'Letts', 'Bottom', 'Hibler', 'Fuhrman', 'Lewis', 'Moudy', 'Goyette', 'Difranco', 'Kyles', 'Sluss', 'Bruening', 'Halladay', 'Leinen', 'Leister', 'Morgado', 'Wadkins', 'Yingst', 'Hyland', 'Carasco', 'Stever', 'Weisz', 'Woldt', 'Leak', 'Sinclair', 'Heinen', 'Furniss', 'Hosler', 'Shumpert', 'Keasler', 'Stgelais', 'Landers', 'Hogle', 'Ates', 'Vanatta', 'Goodlow', 'Haner', 'Yaple', 'Lamark', 'Cataldo', 'Smelcer', 'Marco', 'Quaranta', 'Cooke', 'Ardrey', 'Guilford', 'Polo', 'Sprouse', 'Gaffney', 'Lafromboise'];
  var jobTitles = ['Language Translator', 'Propeller-Driven Airplane Mechanic', 'Work Ticket Distributor', 'Pipe Organ Technician', 'LAN Systems Administrator', 'Employment Clerk', 'Electrical Lineworker', 'Serials Librarian', 'Technical Services Librarian', 'Blackjack Supervisor', 'Pulpwood Cutter', 'Military Science Teacher', 'Missile Pad Mechanic', 'Psychology Professor', 'Scene and Lighting Design Lecturer', 'Internet Marketing Manager', 'Business Services Sales Representative', 'Assistant Corporation Counsel', 'Photocopying Equipment Repairer', 'Post-Anesthesia Care Unit Nurse', 'Animal Husbandry Manager', 'Electrical Engineering Director', 'Drag Car Racer', 'Auto Detailer', 'Childrens Pastor', 'Strawberry Sorter', 'Geophysicist', 'Financial Accountant', 'Crown and Bridge Technician', 'Jig Bore Tool Maker', 'Union Representative', 'High School Librarian', 'High School History Teacher', 'Beveling and Edging Machine Operator', 'Roller Skater', 'Wallpaperer Helper', 'Childcare Center Administrator', 'Ordnance Engineer', 'Industrial Waste Treatment Technician', 'Airline Transport Pilot', 'Window Trimmer', 'Garment Presser', 'State Archivist', 'Die Designer', 'Ventriloquist', 'Calculus Professor', 'Technical Writer', 'Meat Packager', 'Automobile Body Painter', 'Aircraft Landing Gear Inspector', 'Fashion Designer', 'Drywall Stripper', 'Clown', 'National Association for Stock Car Auto Racing Driver', 'Staff Electronic Warfare Officer', 'Hydroelectric Machinery Mechanic', 'Clinical Services Director', 'Traffic Court Referee', 'Internal Medicine Nurse Practitioner', 'Horticulture Instructor', 'Ships Electronic Warfare Officer', 'Broadcast Maintenance Engineer', 'Weight Training Instructor', 'Potato Sorter', 'Appliance Parts Counter Clerk', 'Body Shop Supervisor', 'Accounts Collector', 'Commercial Lender', 'Scale Clerk', 'Obstetrician/Gynecologist', 'Gaming Cage Cashier', 'Fresco Artist', 'Youth Pastor', 'Parachute Officer', 'Geophysical Engineer', 'Route Sales Person', 'Master of Ceremonies', 'Cloak Room Attendant', 'Gas Main Fitter', 'Religious Activities Director', 'Hemodialysis Technician', 'Telephone Lines Repairer', 'Periodontist', 'Wood Fence Installer', 'Offbearer', 'Aviation Tactical Readiness Officer', 'Biology Laboratory Assistant', 'Emergency Room Orderly', 'Magician', 'Dog Trainer'];
  var statuses = [{ 'name': 'Active', 'value': 1 }, { 'name': 'Disabled', 'value': 2 }, { 'name': 'Suspended', 'value': 3 }];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function randomDate() {
    var start = new Date(1960, 0, 1), end = new Date(1994, 0, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  w.generateRows = function(rows, extraCols) {
    rows = rows || 100;
    extraCols = extraCols || 0;
    for (var i = 0; i < rows; i++) {
      var data = {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        dob: randomDate()
      };
      var row = '<tr>';
      //row += '<td class="expand"></td>';
      row += '<td>' + data.firstName + '</td>';
      row += '<td>' + data.lastName + '</td>';
      row += '<td>' + data.jobTitle + '</td>';
      row += '<td data-value="' + data.dob.getTime() + '">' + data.dob.getDate() + ' ' + months[data.dob.getMonth()] + ' ' + data.dob.getFullYear() +'</td>';
      row += '<td data-value="' + data.status.value + '">' + data.status.name + '</td>';
      for (var j = 0; j < extraCols; j++) {
        row += '<td>' + (i+1) + '.' + (j+1) + '</td>';
      }
      row += '</tr>';
      document.writeln(row);
    }
  };
})(window);