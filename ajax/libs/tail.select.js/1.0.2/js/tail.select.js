/**
 *  tail.select - The vanilla JavaScript solution to make your <select> fields awesome!
 *
 *  @author     Ciprian Popescu <getbutterfly@gmail.com>
 *  @version    1.0.2
 *  @url        https://getbutterfly.com/tail-select/
 *  @github     https://github.com/wolffe/tail.select.js
 *  @license    MIT License
 *  @copyright  Copyright 2020 - 2024 Ciprian Popescu <getbutterfly@gmail.com>
 */
const tail = {
    select: function (selector, options = {}) {
        // Default options
        const defaultOptions = {
            multiTags: false,
            multiCounter: true,
            theme: 'light', // light|dark
            classNames: 'tail-default',
            strings: {
                all: "All",
                none: "None",
                placeholder: "Select an option...",
                search: "Type in to search...",
            }
        };

        // Merge default options with provided options
        const opts = { ...defaultOptions, ...options };

        // Extract options
        const { multiTags, multiCounter, theme, classNames, strings } = opts;

        //
        const originalSelects = document.querySelectorAll(selector);

        originalSelects.forEach((originalSelect) => {
            // Hide original dropdown
            originalSelect.style.display = "none";

            // Create custom dropdown container
            const customDropdown = document.createElement("div");
            customDropdown.classList.add("tail-select");
            customDropdown.classList.add(originalSelect.id);
            customDropdown.classList.add(opts.classNames);
            customDropdown.dataset.theme = `tail-theme--${opts.theme}`;

            if (originalSelect.multiple) {
                customDropdown.classList.add("tail--multiple");
            } else {
                customDropdown.classList.add("tail--single");
            }

            // Create search input
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.classList.add('tail--search');
            searchInput.placeholder = strings.placeholder || "Select an option...";

            // Add focus event to change the placeholder
            searchInput.addEventListener("focus", () => {
                searchInput.placeholder = strings.search || "Type in to search...";
            });

            // Add blur event to revert the placeholder when not focused
            searchInput.addEventListener("blur", () => {
                searchInput.placeholder = strings.placeholder || "Select an option...";
            });

            // Add input event to change the placeholder
            searchInput.addEventListener("input", () =>
                filterOptions(originalSelect, searchInput)
            );

            // Create floating toolbar
            const tailFloatingToolbar = document.createElement("div");
            tailFloatingToolbar.classList.add("tail--toolbar");

            // Create toggle-all checkbox
            const toggleAllCheckbox = document.createElement("input");
            toggleAllCheckbox.type = "checkbox";
            toggleAllCheckbox.value = strings.all || "All";
            toggleAllCheckbox.addEventListener("change", () =>
                toggleAll(originalSelect, toggleAllCheckbox)
            );

            const toggleAllLabel = document.createElement("label");
            toggleAllLabel.textContent = strings.all || "All";
            toggleAllLabel.classList.add("all");
            toggleAllLabel.appendChild(toggleAllCheckbox);

            // Create uncheck-all button
            const uncheckAllButton = document.createElement("button");
            uncheckAllButton.type = 'button';
            uncheckAllButton.textContent = strings.none || "None";
            uncheckAllButton.classList.add("uncheck");
            uncheckAllButton.addEventListener("click", () =>
                uncheckAll(originalSelect)
            );

            if (opts.multiCounter) {
                // Create counter
                const counter = document.createElement("span");
                counter.textContent = "0";
                counter.classList.add("tail--counter");

                customDropdown.appendChild(counter);
            }

            // Create nested list
            const nestedList = document.createElement("div");
            nestedList.classList.add("tail--nested-dropdown");
            nestedList.style.display = "none"; // Initially hide the list

            customDropdown.appendChild(searchInput);
            customDropdown.appendChild(tailFloatingToolbar);
            customDropdown.appendChild(nestedList);

            tailFloatingToolbar.appendChild(toggleAllLabel);
            tailFloatingToolbar.appendChild(uncheckAllButton);

            // Insert custom dropdown after the original select
            originalSelect.insertAdjacentElement("afterend", customDropdown);

            // Create ul element for displaying selected options as pills
            const selectedOptionsList = document.createElement("ul");
            selectedOptionsList.classList.add("tail--selected-options-list");

            if (opts.multiTags) {
                if (originalSelect.multiple) {
                    // Insert selectedOptionsList as the next sibling of customDropdown
                    customDropdown.insertAdjacentElement(
                        "afterend",
                        selectedOptionsList
                    );
                }
            }
            //

            function buildNestedList() {
                const fragment = document.createDocumentFragment();

                const optgroups = originalSelect.getElementsByTagName(
                    "optgroup"
                );

                if (optgroups.length > 0) {
                    for (let i = 0; i < optgroups.length; i++) {
                        const optgroup = optgroups[i];
                        const optgroupItem = document.createElement("div");
                        optgroupItem.classList.add("tail--optgroup");

                        // Create label for optgroup
                        const optgroupLabel = document.createElement("label");

                        // Create checkbox for optgroup
                        const optgroupCheckbox = document.createElement(
                            "input"
                        );
                        optgroupCheckbox.type = "checkbox";
                        optgroupCheckbox.value = optgroup.label;
                        optgroupCheckbox.addEventListener("change", () =>
                            toggleOptgroup(optgroupCheckbox)
                        );
                        optgroupLabel.appendChild(optgroupCheckbox);

                        // Label text for optgroup
                        const optgroupLabelText = document.createElement(
                            "span"
                        );
                        optgroupLabelText.textContent = optgroup.label;
                        optgroupLabelText.classList.add("tail--optgroup-label");
                        optgroupLabel.appendChild(optgroupLabelText);

                        optgroupItem.appendChild(optgroupLabel);

                        // Nested options list
                        const nestedOptionsList = document.createElement("div");

                        // Add ARIA attributes to the nested options list
                        nestedOptionsList.setAttribute("role", "listbox");
                        nestedOptionsList.classList.add("tail--nested-dropdown-list");
                        const options = optgroup.getElementsByTagName("option");

                        for (let j = 0; j < options.length; j++) {
                            const option = options[j];
                            const optionItem = document.createElement("div");
                            optionItem.classList.add("tail--nested-dropdown-item");

                            // Create checkbox for option
                            const optionCheckbox = document.createElement(
                                "input"
                            );
                            optionCheckbox.type = "checkbox";
                            optionCheckbox.value = option.textContent;

                            // Create label for option
                            const optionLabel = document.createElement("label");

                            // Label for option text
                            const optionLabelText = document.createElement(
                                "span"
                            );
                            optionLabelText.textContent = option.textContent;

                            // Option description
                            if (option.dataset.description) {
                                optionLabelText.innerHTML += `<small>${option.dataset.description}</small>`;
                            }

                            // Check it
                            if (option.selected && option.hasAttribute('selected')) {
                                optionCheckbox.checked = true;
                                updateCounter(originalSelect);
                                updateCustomTextInput(originalSelect);
                            }

                            //

                            optionLabel.appendChild(optionCheckbox);
                            optionLabel.appendChild(optionLabelText);

                            optionItem.appendChild(optionLabel);

                            nestedOptionsList.appendChild(optionItem);
                        }

                        optgroupItem.appendChild(nestedOptionsList);
                        nestedList.appendChild(optgroupItem);
                    }
                } else {
                    const options = originalSelect.getElementsByTagName(
                        "option"
                    );

                    for (let j = 0; j < options.length; j++) {
                        const option = options[j];
                        const optionItem = document.createElement("div");
                        optionItem.classList.add("tail--nested-dropdown-item");

                        // Create checkbox for option
                        const optionCheckbox = document.createElement("input");
                        optionCheckbox.type = "checkbox";
                        optionCheckbox.value = option.textContent;

                        // Create label for option
                        const optionLabel = document.createElement("label");

                        // Label for option text
                        const optionLabelText = document.createElement("span");
                        optionLabelText.textContent = option.textContent;

                        // Option description
                        if (option.dataset.description) {
                            optionLabelText.innerHTML += `<small>${option.dataset.description}</small>`;
                        }

                        // Check it
                        if (option.selected && option.hasAttribute('selected')) {
                            optionCheckbox.checked = true;
                            updateCounter(originalSelect);
                            updateCustomTextInput(originalSelect);
                        }
                        //

                        optionLabel.appendChild(optionCheckbox);
                        optionLabel.appendChild(optionLabelText);

                        optionItem.appendChild(optionLabel);

                        nestedList.appendChild(optionItem);
                    }
                }

                // Add ARIA attributes to the custom dropdown container
                customDropdown.setAttribute("role", "combobox");
                customDropdown.setAttribute("aria-haspopup", "true");
                customDropdown.setAttribute("aria-expanded", "false");

                attachOptionCheckboxListeners();

                // Append the fragment to the DOM once all changes are made
                nestedList.appendChild(fragment);
            }

            function toggleAll(originalSelect, toggleAllCheckbox) {
                const isChecked = toggleAllCheckbox.checked;
                const optionCheckboxes = nestedList.querySelectorAll(
                    'input[type="checkbox"]'
                );

                optionCheckboxes.forEach((checkbox) => {
                    checkbox.checked = isChecked;
                    updateOriginalOptionState(originalSelect, checkbox);
                });
            }

            function uncheckAll(originalSelect) {
                const optionCheckboxes = nestedList.querySelectorAll(
                    'input[type="checkbox"]'
                );

                optionCheckboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                    updateOriginalOptionState(originalSelect, checkbox);
                });

                // Uncheck the original <select> options
                const originalOptions = originalSelect.getElementsByTagName(
                    "option"
                );
                for (let i = 0; i < originalOptions.length; i++) {
                    originalOptions[i].selected = false;
                }
            }

            function toggleOption(checkbox) {
                if (originalSelect.multiple) {
                    updateOriginalOptionState(originalSelect, checkbox);
                } else {
                    // For single-select, uncheck all and check the current one
                    const optionCheckboxes = nestedList.querySelectorAll(
                        '.tail--nested-dropdown-item input[type="checkbox"]'
                    );
                    optionCheckboxes.forEach((cb) => (cb.checked = false));
                    checkbox.checked = true;
                    updateOriginalOptionState(originalSelect, checkbox);
                }
            }

            function toggleOptgroup(optgroupCheckbox) {
                const isChecked = optgroupCheckbox.checked;
                const nestedOptionsList = optgroupCheckbox
                    .closest(".tail--optgroup")
                    .querySelector(".tail--nested-dropdown-list");
                const optionCheckboxes = nestedOptionsList.querySelectorAll(
                    'input[type="checkbox"]'
                );

                optionCheckboxes.forEach((checkbox) => {
                    checkbox.checked = isChecked;
                    toggleOption(checkbox); // Call toggleOption for individual options
                });

                if (!originalSelect.multiple) {
                    // For single-select, uncheck all other checkboxes in the same optgroup
                    const customDropdown = originalSelect.closest(
                        ".tail-select"
                    );
                    if (customDropdown) {
                        const otherOptgroupCheckboxes = customDropdown.querySelectorAll(
                            '.tail--nested-dropdown-item input[type="checkbox"]'
                        );

                        otherOptgroupCheckboxes.forEach((cb) => {
                            if (cb !== optgroupCheckbox) {
                                cb.checked = false;
                                updateOriginalOptionState(originalSelect, cb);
                            }
                        });
                    }
                }

                updateOriginalOptionState(originalSelect, optgroupCheckbox);
            }

            function attachOptionCheckboxListeners() {
                const optionCheckboxes = nestedList.querySelectorAll(
                    '.tail--nested-dropdown-item input[type="checkbox"]'
                );

                optionCheckboxes.forEach((checkbox) => {
                    checkbox.addEventListener("change", () =>
                        toggleOption(checkbox)
                    );
                });
            }

            function updateOriginalOptionState(
                originalSelect,
                checkbox,
                customDropdown
            ) {
                const optionValue = checkbox.value;
                const option = Array.from(originalSelect.options).find(
                    (opt) =>
                        opt.value === optionValue ||
                        opt.textContent === optionValue
                );

                if (option) {
                    if (checkbox.checked) {
                        option.selected = true;
                    } else {
                        option.selected = false;
                    }

                    // Trigger change event for the original select
                    const event = new Event("change", { bubbles: true });
                    originalSelect.dispatchEvent(event);
                }

                // Get all selected options
                const selectedOptions = Array.from(
                    originalSelect.options
                ).filter((opt) => opt.selected);

                // Update the search input value with the selected option text
                if (!originalSelect.multiple) {
                    if (selectedOptions.length > 0 && searchInput) {
                        searchInput.value = selectedOptions[0].textContent;
                    } else {
                        searchInput.value = ""; // Clear the search input if no option is selected
                    }
                } else {
                    // Update searchInput value with selected options
                    searchInput.value = selectedOptions
                        .map((opt) => opt.textContent)
                        .join(", ");
                }

                if (opts.multiTags) {
                    if (originalSelect.multiple) {
                        // Update the selected options list
                        updateSelectedOptionsList(
                            selectedOptionsList,
                            selectedOptions
                        );
                    }
                }

                // Convert selected options to an array of values
                const selectedValues = selectedOptions.map((opt) => opt.value);
                // Log the selected values to the console
                // console.log(selectedValues);

                var options = originalSelect.options,
                    count = 0;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].selected) count++;
                }

                if (opts.multiCounter) {
                    // Update the counter element
                    let customId = originalSelect.id;
                    if (customId) {
                        let counterElement = document
                            .querySelector(`.${customId}`)
                            .querySelector(".tail--counter");

                        if (counterElement) {
                            counterElement.textContent = count;
                        }
                    }
                }
            }

            function filterOptions(originalSelect, searchInput) {
                const searchTerm = searchInput.value.trim().toLowerCase();
                const optionItems = nestedList.querySelectorAll("div");

                optionItems.forEach((optionItem) => {
                    const optionCheckbox = optionItem.querySelector(
                        'input[type="checkbox"]'
                    );
                    const optionLabel = optionCheckbox.nextElementSibling.textContent.toLowerCase();
                    const optgroupItem = optionItem.closest("div");

                    // Hide or show options based on the search term
                    optionCheckbox.style.display = optionLabel.includes(
                        searchTerm
                    )
                        ? "inline-block"
                        : "none";
                });

                optionItems.forEach((optionItem) => {
                    const optionCheckbox = optionItem.querySelector(
                        'input[type="checkbox"]'
                    );
                    const optgroupItem = optionItem.closest("div");

                    // Check if there are visible checkboxes within the nested list
                    const nestedCheckboxes = optionItem.querySelectorAll(
                        'div input[type="checkbox"]:not([style="display: none;"])'
                    );
                    const hasVisibleNestedCheckboxes =
                        nestedCheckboxes.length > 0;

                    // Show the parent li only if the checkbox or a visible nested checkbox is present
                    optgroupItem.style.display =
                        optionCheckbox.style.display === "inline-block" ||
                            hasVisibleNestedCheckboxes
                            ? "block"
                            : "none";
                });
            }

            function updateSelectedOptionsList(
                selectedOptionsList,
                selectedOptions
            ) {
                // Clear existing list items
                selectedOptionsList.innerHTML = "";

                // Create list items for each selected option
                selectedOptions.forEach((opt) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = opt.textContent;
                    selectedOptionsList.appendChild(listItem);
                });
            }

            function updateCustomTextInput(originalSelect) {
                // Get all selected options
                const selectedOptions = Array.from(originalSelect.options).filter((opt) => {
                    // Check if the option is selected and has the 'selected' attribute
                    return opt.selected && opt.hasAttribute('selected');
                });


                // Update the search input value with the selected option text
                if (!originalSelect.multiple) {
                    if (selectedOptions.length > 0 && searchInput) {
                        searchInput.value = selectedOptions[0].textContent;
                    } else {
                        searchInput.value = ""; // Clear the search input if no option is selected
                    }
                } else {
                    // Update searchInput value with selected options
                    searchInput.value = selectedOptions
                        .map((opt) => opt.textContent)
                        .join(", ");
                }

                if (opts.multiTags) {
                    if (originalSelect.multiple) {
                        // Update the selected options list
                        updateSelectedOptionsList(
                            selectedOptionsList,
                            selectedOptions
                        );
                    }
                }
            }


            function updateCounter(originalSelect) {
                // Get the custom ID for the current original select
                let customId = originalSelect.id;

                if (customId) {
                    // Get the counter element
                    let counterElement = document
                        .querySelector(`.${customId}`)
                        .querySelector(".tail--counter");

                    if (counterElement) {
                        // Get the count of selected options
                        const count = Array.from(originalSelect.options).filter(
                            (opt) => opt.selected
                        ).length;

                        // Update the counter element
                        counterElement.textContent = count;
                    }
                }
            }

            function toggleDropdownVisibility() {
                nestedList.style.display = "block";
                customDropdown.setAttribute("aria-expanded", "true");
            }

            function hideDropdown() {
                nestedList.style.display = "none";
                customDropdown.setAttribute("aria-expanded", "false");
            }

            function handleClickOutside(event) {
                if (!customDropdown.contains(event.target)) {
                    hideDropdown();
                }
            }

            function handleKeyDown(event) {
                if (event.key === "Escape") {
                    hideDropdown();
                }
            }

            // Show the dropdown when the input field is focused
            searchInput.addEventListener("focus", toggleDropdownVisibility);

            // Hide the dropdown when clicking outside of it
            document.addEventListener("click", handleClickOutside);

            // Hide the dropdown when pressing the ESC key
            document.addEventListener("keydown", handleKeyDown);

            buildNestedList();
        });
    }
};
