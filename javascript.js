var gErrorMsg = "";

// ====================
// GLOBAL ARRAYS SECTION
// ====================
var gProducts = ["Bouquet", "CNY Decoration", "Promotions"];
var gWorkshops = ["Hand-tied Bouquet", "Florist to be 1", "Florist to be 2", "Hobby Class"];
var gActivities = ["Workshop", "Promotion"];

// =========================================
// ENHANCEMENT: CONFIRMATION PAGE FUNCTIONS
// =========================================

// Client Storage Functions for Enquiry Form
function storeEnquiry(fname, lname, email, phone, saddress, city, state, postcode, enquiry, subject, comment) {
    sessionStorage.fname = fname;
    sessionStorage.lname = lname;
    sessionStorage.email = email;
    sessionStorage.phone = phone;
    sessionStorage.saddress = saddress;
    sessionStorage.city = city;
    sessionStorage.state = state;
    sessionStorage.postcode = postcode;
    sessionStorage.enquiry = enquiry;
    sessionStorage.subject = subject;
    sessionStorage.comment = comment;
    sessionStorage.formType = "enquiry";
}

// Client Storage Functions for Register Form
function storeRegistration(fname, lname, email, phone, workshop, subject, wdate, wtime, participants, comment) {
    sessionStorage.fname = fname;
    sessionStorage.lname = lname;
    sessionStorage.email = email;
    sessionStorage.phone = phone;
    sessionStorage.workshop = workshop;
    sessionStorage.subject = subject;
    sessionStorage.wdate = wdate;
    sessionStorage.wtime = wtime;
    sessionStorage.participants = participants;
    sessionStorage.comment = comment;
    sessionStorage.formType = "register";
}

// Confirmation Page Functions
function validateConfirmation(event) {
    "use strict";
    
    var errMsg = "";
    var result = true;
    
    if (result) {
        alert("Submission Successful! Your email client will open to send the form data.");
        
        // Add form data as hidden fields or let the form submit normally
        addHiddenFieldsToForm();
        
        // Allow the form to submit normally (to mailto:)
        return true;
    } else {
        alert("Submission Failed");
        return false;
    }
}

function addHiddenFieldsToForm() {
    var form = document.getElementById("confirmForm");
    var formType = sessionStorage.formType;
    
    // Clear any existing hidden fields
    var existingHidden = form.querySelectorAll('input[type="hidden"]');
    existingHidden.forEach(function(field) {
        field.remove();
    });
    
    // Add hidden fields based on form type
    if (formType === "enquiry") {
        addHiddenField(form, "First Name", sessionStorage.fname);
        addHiddenField(form, "Last Name", sessionStorage.lname);
        addHiddenField(form, "Email", sessionStorage.email);
        addHiddenField(form, "Phone", sessionStorage.phone);
        addHiddenField(form, "Street Address", sessionStorage.saddress);
        addHiddenField(form, "City/Town", sessionStorage.city);
        addHiddenField(form, "State", sessionStorage.state);
        addHiddenField(form, "Postcode", sessionStorage.postcode);
        addHiddenField(form, "Enquiry Type", sessionStorage.enquiry);
        addHiddenField(form, "Subject", sessionStorage.subject);
        addHiddenField(form, "Comments", sessionStorage.comment);
    } else if (formType === "register") {
        addHiddenField(form, "First Name", sessionStorage.fname);
        addHiddenField(form, "Last Name", sessionStorage.lname);
        addHiddenField(form, "Email", sessionStorage.email);
        addHiddenField(form, "Phone", sessionStorage.phone);
        addHiddenField(form, "Workshop Type", sessionStorage.workshop);
        addHiddenField(form, "Subject", sessionStorage.subject);
        addHiddenField(form, "Workshop Date", sessionStorage.wdate);
        addHiddenField(form, "Workshop Time", sessionStorage.wtime);
        addHiddenField(form, "Participants", sessionStorage.participants);
        addHiddenField(form, "Comments", sessionStorage.comment);
    }
}

function addHiddenField(form, name, value) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value || "";
    form.appendChild(input);
}

function getConfirmation() {
    if (sessionStorage.fname != undefined) {
        // Always show personal info
        document.getElementById("confirm_fname").textContent = sessionStorage.fname;
        document.getElementById("confirm_lname").textContent = sessionStorage.lname;
        document.getElementById("confirm_email").textContent = sessionStorage.email;
        document.getElementById("confirm_phone").textContent = sessionStorage.phone;
        
        // Check if it's an enquiry form (has address fields)
        if (sessionStorage.formType === "enquiry") {
            document.getElementById("addressSection").style.display = "block";
            document.getElementById("enquirySection").style.display = "block";
            document.getElementById("workshopSection").style.display = "none";
            
            document.getElementById("confirm_saddress").textContent = sessionStorage.saddress;
            document.getElementById("confirm_city").textContent = sessionStorage.city;
            document.getElementById("confirm_state").textContent = sessionStorage.state;
            document.getElementById("confirm_postcode").textContent = sessionStorage.postcode;
            document.getElementById("confirm_enquiry").textContent = sessionStorage.enquiry;
            document.getElementById("confirm_subject").textContent = sessionStorage.subject;
            document.getElementById("confirm_comment").textContent = sessionStorage.comment;
        }
        
        // Check if it's a workshop registration form
        if (sessionStorage.formType === "register") {
            document.getElementById("workshopSection").style.display = "block";
            document.getElementById("addressSection").style.display = "none";
            document.getElementById("enquirySection").style.display = "none";
            
            document.getElementById("confirm_workshop").textContent = sessionStorage.workshop;
            document.getElementById("confirm_wsubject").textContent = sessionStorage.subject;
            document.getElementById("confirm_wdate").textContent = sessionStorage.wdate;
            document.getElementById("confirm_wtime").textContent = sessionStorage.wtime;
            document.getElementById("confirm_participants").textContent = sessionStorage.participants;
            document.getElementById("confirm_wcomment").textContent = sessionStorage.comment;
        }
    } else {
        // No data found in sessionStorage, redirect back to forms
        alert("No form data found. Please fill out the form again.");
        window.location.href = "index.html";
    }
}

function cancelSubmission() {
    sessionStorage.clear();
    window.history.back();
}

function initConfirmationPage() {
    getConfirmation();
    
    var confirmForm = document.getElementById("confirmForm");
    var cancelButton = document.getElementById("cancelButton");
    
    if (confirmForm) {
        confirmForm.onsubmit = function(event) {
            return validateConfirmation();
        };
    }
    
    if (cancelButton) {
        cancelButton.onclick = cancelSubmission;
    }
}

// ===================================
// NAVIGATION AND DROPDOWN FUNCTIONS
// ===================================
function highlightCurrentPage() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove existing active class from all navigation items
    document.querySelectorAll('.menu a, .menu .dropbtn').forEach(function(item) {
        item.classList.remove('active');
    });
    
    // Highlight based on current page
    switch(currentPage) {
        case 'index.html':
            var homeLink = document.querySelector('.menu a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
            break;
            
        case 'workshop.html':
        case 'promotion.html':
            // Highlight Activities dropdown and the specific activity
            var activitiesBtn = document.querySelector('.dropdown:nth-child(2) .dropbtn');
            var activityLink = document.querySelector('.menu a[href="' + currentPage + '"]');
            if (activitiesBtn) activitiesBtn.classList.add('active');
            if (activityLink) activityLink.classList.add('active');
            break;
            
        case 'product1.html':
        case 'product2.html':
            // Highlight Products dropdown and the specific product
            var productsBtn = document.querySelector('.dropdown:nth-child(3) .dropbtn');
            var productLink = document.querySelector('.menu a[href="' + currentPage + '"]');
            if (productsBtn) productsBtn.classList.add('active');
            if (productLink) productLink.classList.add('active');
            break;
            
        case 'enquiry.html':
            var enquiryLink = document.querySelector('.menu a[href="enquiry.html"]');
            if (enquiryLink) enquiryLink.classList.add('active');
            break;
            
        case 'register.html':
            var registerLink = document.querySelector('.menu a[href="register.html"]');
            if (registerLink) registerLink.classList.add('active');
            break;
            
        case 'acknowledgement.html':
        case 'enhancement.html':
        case 'enhancement2.html':
        case 'profile.html':
            // These are footer link
            var footerLink = document.querySelector('.footer a[href="' + currentPage + '"]');
            if (footerLink) footerLink.classList.add('active');
            break;
    }
}

function setupDropdowns() {
    var dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(function(dropdown) {
        var dropbtn = dropdown.querySelector('.dropbtn');
        var dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(function(content) {
                    if (content !== dropdownContent) {
                        content.style.display = 'none';
                    }
                });
                
                // Toggle current dropdown
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            });
        }
    });
    
    // Setup right menu toggle
    var rightMenuToggle = document.getElementById('right-menu-toggle');
    var rightAsideMenu = document.querySelector('.right-aside-menu-bouquet') || document.querySelector('.right-aside-menu-workshop');
    var rightMenuIcon = document.querySelector('.right-menu-icon');
    
    if (rightMenuIcon && rightAsideMenu) {
        rightMenuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            rightMenuToggle.checked = !rightMenuToggle.checked;
            
            // Close main navigation dropdowns
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                content.style.display = 'none';
            });
            
            // Toggle right aside menu
            if (rightMenuToggle.checked) {
                rightAsideMenu.style.display = 'block';
            } else {
                rightAsideMenu.style.display = 'none';
            }
        });
    }
    
    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn') && 
            !e.target.closest('.dropdown-content') &&
            !e.target.matches('.right-menu-icon') &&
            !e.target.closest('.right-aside-menu-bouquet') &&
            !e.target.closest('.right-aside-menu-workshop')) {
            
            // Close main navigation dropdowns
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                content.style.display = 'none';
            });
            
            // Close right aside menu
            if (rightMenuToggle && rightAsideMenu) {
                rightMenuToggle.checked = false;
                rightAsideMenu.style.display = 'none';
            }
        }
    });
}

// ===============================
// DROPDOWN POPULATION FUNCTIONS
// ===============================
function populateEnquiryDropdown() {
    var enquiryDropdown = document.getElementById("enquiry");
    
    if (enquiryDropdown) {
        while (enquiryDropdown.options.length > 1) {
            enquiryDropdown.remove(1);
        }
        
        // Create options from gProducts array (INCLUDING Promotions)
        for (var i = 0; i < gProducts.length; i++) {
            var option = document.createElement("option");
            // FIX: Replace ALL spaces with hyphens using global regex
            option.value = gProducts[i].toLowerCase().replace(/ /g, '-');
            option.text = gProducts[i];
            enquiryDropdown.appendChild(option);
        }
    }
}

function populateWorkshopDropdown() {
    var workshopDropdown = document.getElementById("register");
    
    if (workshopDropdown) {
        while (workshopDropdown.options.length > 1) {
            workshopDropdown.remove(1);
        }
        
        for (var i = 0; i < gWorkshops.length; i++) {
            var option = document.createElement("option");
            option.value = gWorkshops[i].toLowerCase().replace(/ /g, '-');
            option.text = gWorkshops[i];
            workshopDropdown.appendChild(option);
        }
    }
}

function populateNavigationDropdowns() {
    // Populate Activities dropdown
    var activitiesDropdown = document.querySelector('.dropdown:nth-child(2) .dropdown-content');
    if (activitiesDropdown) {
        activitiesDropdown.innerHTML = ''; // Clear existing content
        
        for (var i = 0; i < gActivities.length; i++) {
            var link = document.createElement("a");
            link.href = gActivities[i].toLowerCase() + ".html";
            link.textContent = gActivities[i];
            activitiesDropdown.appendChild(link);
        }
    }
    
    // Populate Products dropdown (EXCLUDING Promotions)
    var productsDropdown = document.querySelector('.dropdown:nth-child(3) .dropdown-content');
    if (productsDropdown) {
        productsDropdown.innerHTML = '';  
        
        for (var i = 0; i < gProducts.length; i++) {
            // Skip "Promotions" in the Products navigation dropdown
            if (gProducts[i] === "Promotions") {
                continue;
            }
            
            var link = document.createElement("a");
            
            // Set appropriate href based on product
            if (gProducts[i] === "Bouquet") {
                link.href = "product1.html";
            } else if (gProducts[i] === "CNY Decoration") {
                link.href = "product2.html";
            }
            
            link.textContent = gProducts[i];
            productsDropdown.appendChild(link);
        }
    }
}

// ==================================
// URL PARAMETER HANDLING FUNCTIONS
// ==================================
function getUrlParams() {
    var params = new URLSearchParams(window.location.search);
    return {
        enquiry: params.get('enquiry') || params.get('type') || params.get('product'),
        bouquet: params.get('bouquet'),
        cny: params.get('cny') || params.get('cny-decoration')
    };
}

function autoFillFromUrl() {
    var urlParams = getUrlParams();
    var enquiry = urlParams.enquiry;
    var bouquet = urlParams.bouquet;
    var cny = urlParams.cny;
    var enquiryDropdown = document.getElementById('enquiry');
    var subjectInput = document.getElementById('subject');
    
    console.log('URL Parameters:', { enquiry, bouquet, cny }); // Debug log
    
    if ((enquiry || bouquet || cny) && enquiryDropdown && subjectInput) { 
        var dropdownValue = enquiry;
         
        // Handle different parameter names that might come from product pages
        if (enquiry === 'products' || enquiry === 'bouquet') {
            dropdownValue = 'bouquet';
        }
        else if (enquiry === 'promotions') {
            dropdownValue = 'promotions';
        } 
        else if (enquiry === 'cny-decoration' || enquiry === 'cny' || cny) {
            dropdownValue = 'cny-decoration';
        }
         
        // Set the dropdown value if we found a match
        if (dropdownValue && enquiryDropdown.querySelector(`option[value="${dropdownValue}"]`)) {
            enquiryDropdown.value = dropdownValue;
        }
         
        // Auto-fill subject based on URL parameters
        if (bouquet) { 
            switch(bouquet) {
                case 'roses':
                    subjectInput.value = 'RE: Enquiry on Rose Bouquet';
                    break;
                case 'rosebb':
                    subjectInput.value = 'RE: Enquiry on Roses with Baby Breath Bouquet';
                    break;
                case 'roseh':
                    subjectInput.value = 'RE: Enquiry on Roses with Hydrangea Bouquet';
                    break;
                case 'rosep':
                    subjectInput.value = 'RE: Enquiry on Roses with Phalaenopis Bouquet';
                    break;
                case 'roset':
                    subjectInput.value = 'RE: Enquiry on Roses with Tulips Bouquet';
                    break;
                case 'soap':
                    subjectInput.value = 'RE: Enquiry on Soap Bouquet';
                    break;
                case 'sun':
                    subjectInput.value = 'RE: Enquiry on Sunflower Bouquet';
                    break;
                case 'carna':
                    subjectInput.value = 'RE: Enquiry on Carnation Bouquet';
                    break;
                case 'hydra':
                    subjectInput.value = 'RE: Enquiry on Hydrangea Bouquet';
                    break;
                case 'tulip':
                    subjectInput.value = 'RE: Enquiry on Tulip Bouquet';
                    break;
                case 'babyb':
                    subjectInput.value = 'RE: Enquiry on Baby Breath Bouquet';
                    break;
                case 'gerb':
                    subjectInput.value = 'RE: Enquiry on Gerbera Bouquet';
                    break;
                case 'phala':
                    subjectInput.value = 'RE: Enquiry on Phalaenopis Bouquet';
                    break;
                case 'lilies':
                    subjectInput.value = 'RE: Enquiry on Lily Bouquet';
                    break;
                case 'mix':
                    subjectInput.value = 'RE: Enquiry on Mixed Flower Bouquet';
                    break;
                default:
                    subjectInput.value = 'RE: Enquiry on Bouquet';
            }
        } else if (cny || enquiry === 'cny-decoration' || enquiry === 'cny') { 
            subjectInput.value = 'RE: Enquiry on CNY Decoration';
        } else if (enquiry === 'bouquet') {
            subjectInput.value = 'RE: Enquiry on Bouquet';
        } else if (enquiry === 'promotions') {
            subjectInput.value = 'RE: Enquiry on Promotions';
        }
    }
}

function autoFillSubject() {
    var enquiryDropdown = document.getElementById('enquiry');
    var subjectInput = document.getElementById('subject');
    
    if (enquiryDropdown && subjectInput) {
        enquiryDropdown.addEventListener('change', function() {
            var selectedValue = this.value;
            
            switch(selectedValue) {
                case 'bouquet':
                    subjectInput.value = 'RE: Enquiry on Bouquet';
                    break;
                case 'cny-decoration':
                    subjectInput.value = 'RE: Enquiry on CNY Decoration';
                    break;
                case 'promotions':
                    subjectInput.value = 'RE: Enquiry on Promotions';
                    break;
                default:
                    subjectInput.value = '';
            }
        });
    }
}

function autoFillWorkshopSubject() {
    var workshopDropdown = document.getElementById('register');
    var subjectInput = document.getElementById('subject');
    
    if (workshopDropdown && subjectInput) {
        workshopDropdown.addEventListener('change', function() {
            var selectedValue = this.value;
            
            switch(selectedValue) {
                case 'hand-tied-bouquet':
                    subjectInput.value = 'RE: Registration for Hand-tied Bouquet Workshop';
                    break;
                case 'florist-to-be-1':
                    subjectInput.value = 'RE: Registration for Florist to be 1 Workshop';
                    break;
                case 'florist-to-be-2':
                    subjectInput.value = 'RE: Registration for Florist to be 2 Workshop';
                    break;
                case 'hobby-class':
                    subjectInput.value = 'RE: Registration for Hobby Class Workshop';
                    break;
                default:
                    subjectInput.value = '';
            }
        });
    }
}

function autoFillWorkshopFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var workshop = urlParams.get('workshop');
    var workshopDropdown = document.getElementById('register');
    var subjectInput = document.getElementById('subject');
    
    if (workshop && workshopDropdown && subjectInput) {
        workshopDropdown.value = workshop;
        
        switch(workshop) {
            case 'hand-tied-bouquet':
                subjectInput.value = 'RE: Registration for Hand-tied Bouquet Workshop';
                break;
            case 'florist-to-be-1':
                subjectInput.value = 'RE: Registration for Florist to be 1 Workshop';
                break;
            case 'florist-to-be-2':
                subjectInput.value = 'RE: Registration for Florist to be 2 Workshop';
                break;
            case 'hobby-class':
                subjectInput.value = 'RE: Registration for Hobby Class Workshop';
                break;
            default:
                subjectInput.value = '';
        }
    }
}

// =============================================
// ENHANCEMENT 4: ERROR MESSAGE HANDLING
// =============================================
function showFieldErrors() {
    // Clear all previous error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Define unique error messages for each field - UPDATED FOR BOTH FORMS
    const fieldMessages = {
        'fname': 'First name is required',
        'lname': 'Last name is required',
        'email': 'Email address is required',
        'phone': 'Phone number is required',
        'saddress': 'Street address is required',
        'city/town': 'City/Town is required',
        'state': 'Please select a state',
        'postcode': 'Postcode is required',
        'enquiry': 'Please select an enquiry type',
        'register': 'Please select a workshop type', 
        'subject': 'Subject is required',
        'wdate': 'Workshop date is required', 
        'wtime': 'Workshop time is required', 
        'no_ofparticipant': 'Number of participants is required', 
        'en_comment': 'Comments are required',
        're_comment': 'Comments are required' 
    };
    
    // Check each required field and show unique error if empty
    Object.keys(fieldMessages).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (field && errorElement) {
            if (field.value.trim() === '' || (field.tagName === 'SELECT' && (!field.value || field.value === ''))) {
                errorElement.textContent = fieldMessages[fieldId];
            }
        }
    });
}

// ===========================
// ENHANCED ERROR STYLE FUNCTIONS
// ===========================
function addErrorStyle(element) {
    if (element) {
        element.style.borderBottom = "2px solid red";
        element.style.backgroundColor = "#FFE6E6";
        
        // Show error message if it exists
        const errorElement = document.getElementById(element.id + '-error');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
    }
}

function removeErrorStyle(element) {
    if (element) {
        element.style.borderBottom = "";
        element.style.backgroundColor = "";
        
        // Clear any stored error messages
        const errorElement = document.getElementById(element.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
}

function resetAllErrorStyles() {
    const allFields = document.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        removeErrorStyle(field);
        
        // Also clear any stored error messages
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    });
}

// ===========================
// ENHANCED RESET FUNCTIONS
// ===========================
function clearAllErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Enhanced reset function for Enquiry form
function resetEnquiryForm() {
    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.reset(); // Reset all form fields to default values
        
        // Clear all error messages
        clearAllErrorMessages();
        
        // Remove all error styles
        resetAllErrorStyles();
        
        console.log("Enquiry form has been reset");
    }
}

// Enhanced reset function for Register form
function resetRegisterForm() {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.reset(); // Reset all form fields to default values
        
        // Clear all error messages
        clearAllErrorMessages();
        
        // Remove all error styles
        resetAllErrorStyles();
        
        console.log("Register form has been reset");
    }
}

// Function to handle reset button click
function setupResetButtons() {
    // Setup enquiry form reset button
    const enquiryResetBtn = document.querySelector('#enquiryForm button[type="reset"]');
    if (enquiryResetBtn) {
        enquiryResetBtn.addEventListener('click', function() {
            // Clear errors immediately when reset is clicked
            clearAllErrorMessages();
            resetAllErrorStyles();
            
            // Add a delay to ensure styles are cleared after browser reset
            setTimeout(function() {
                resetAllErrorStyles();
            }, 10);
        });
    }
    
    // Setup register form reset button
    const registerResetBtn = document.querySelector('#registerForm button[type="reset"]');
    if (registerResetBtn) {
        registerResetBtn.addEventListener('click', function() {
            // Clear errors immediately when reset is clicked
            clearAllErrorMessages();
            resetAllErrorStyles();
            
            // Add a delay to ensure styles are cleared after browser reset
            setTimeout(function() {
                resetAllErrorStyles();
            }, 10);
        });
    }
}

// ====================================
// ENQUIRY FORM VALIDATION FUNCTIONS
// ====================================
function validateEnquiryForm(event) {
    "use strict";
    var isAllOK = false;
    gErrorMsg = "";  
     
    resetAllErrorStyles();
    
    // Get all form values for storage
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var saddress = document.getElementById("saddress").value;
    var city = document.getElementById("city/town").value;
    var state = document.getElementById("state").value;
    var postcode = document.getElementById("postcode").value;
    var enquiry = document.getElementById("enquiry").value;
    var subject = document.getElementById("subject").value;
    var comment = document.getElementById("en_comment").value;
    
    var nameOK = chkEnquiryName();
    var emailOK = chkEnquiryEmail();
    var phoneOK = chkEnquiryPhone();
    var addressOK = chkEnquiryAddress();
    var cityOK = chkEnquiryCity();
    var stateOK = chkEnquiryState();
    var postcodeOK = chkEnquiryPostcode();
    var enquiryTypeOK = chkEnquiryType();
    var subjectOK = chkEnquirySubject();
    var commentsOK = chkEnquiryComments();
    
    if (nameOK && emailOK && phoneOK && addressOK && cityOK && stateOK && postcodeOK && enquiryTypeOK && subjectOK && commentsOK) {
        isAllOK = true;
        // Store data in sessionStorage before redirecting
        storeEnquiry(fname, lname, email, phone, saddress, city, state, postcode, enquiry, subject, comment);
        // Allow form to submit normally (redirect to confirm.html)
        return true;
    } else {
        // PREVENT form submission and show alert
        event.preventDefault();
        alert(gErrorMsg);  
        // AFTER alert is closed, show field errors
        showFieldErrors();
        gErrorMsg = "";  
        isAllOK = false;
        return false;
    }
}

function chkEnquiryName() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var pattern = /^[A-Za-z]+$/;
    var nameOk = true;
    
    if (fname.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "First name cannot be blank\n";
        addErrorStyle(fname);
        nameOk = false;
    } else if (!pattern.test(fname.value.trim())) {
        gErrorMsg = gErrorMsg + "First name must only contain alphabetical characters\n";
        addErrorStyle(fname);
        nameOk = false;
    } else if (fname.value.trim().length > 25) {
        gErrorMsg = gErrorMsg + "First name cannot exceed 25 characters\n";
        addErrorStyle(fname);
        nameOk = false;
    } else {
        removeErrorStyle(fname);
    }
    
    if (lname.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Last name cannot be blank\n";
        addErrorStyle(lname);
        nameOk = false;
    } else if (!pattern.test(lname.value.trim())) {
        gErrorMsg = gErrorMsg + "Last name must only contain alphabetical characters\n";
        addErrorStyle(lname);
        nameOk = false;
    } else if (lname.value.trim().length > 25) {
        gErrorMsg = gErrorMsg + "Last name cannot exceed 25 characters\n";
        addErrorStyle(lname);
        nameOk = false;
    } else {
        removeErrorStyle(lname);
    }
    
    return nameOk;
}

function chkEnquiryEmail() {
    var email = document.getElementById("email");
    var result = false;
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Email address cannot be blank\n";
        addErrorStyle(email);
        result = false;
    } else if (pattern.test(email.value.trim())) {
        removeErrorStyle(email);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Enter a valid email address (e.g., name@domain.com)\n";
        addErrorStyle(email);
    }
    return result;
}

function chkEnquiryPhone() {
    var phone = document.getElementById("phone");
    var result = false;
    var pattern = /^01[0-9]{8,9}$/;
    
    if (phone.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Phone number cannot be blank\n";
        addErrorStyle(phone);
        result = false;
    } else if (pattern.test(phone.value.trim())) {
        removeErrorStyle(phone);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Enter a valid Malaysian phone number (should start with 01, e.g., 0123456789)\n";
        addErrorStyle(phone);
    }
    return result;
}

function chkEnquiryAddress() {
    var saddress = document.getElementById("saddress");
    var result = false;
    
    if (saddress.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Street address cannot be blank\n";
        addErrorStyle(saddress);
        result = false;
    } else if (saddress.value.trim().length > 40) {
        gErrorMsg = gErrorMsg + "Street address cannot exceed 40 characters\n";
        addErrorStyle(saddress);
        result = false;
    } else {
        removeErrorStyle(saddress);
        result = true;
    }
    return result;
}

function chkEnquiryCity() {
    var city = document.getElementById("city/town");
    var result = false;
    
    if (city.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "City/Town cannot be blank\n";
        addErrorStyle(city);
        result = false;
    } else if (city.value.trim().length > 20) {
        gErrorMsg = gErrorMsg + "City/Town cannot exceed 20 characters\n";
        addErrorStyle(city);
        result = false;
    } else {
        removeErrorStyle(city);
        result = true;
    }
    return result;
}

function chkEnquiryState() {
    var state = document.getElementById("state");
    var result = false;
    
    if (state.value == null || state.value == "") {
        gErrorMsg = gErrorMsg + "Please select a state\n";
        addErrorStyle(state);
        result = false;
    } else {
        removeErrorStyle(state);
        result = true;
    }
    return result;
}

function chkEnquiryPostcode() {
    var postcode = document.getElementById("postcode");
    var result = false;
    var pattern = /^\d{5}$/;
    
    if (postcode.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Postcode cannot be blank\n";
        addErrorStyle(postcode);
        result = false;
    } else if (pattern.test(postcode.value.trim())) {
        removeErrorStyle(postcode);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Postcode must be exactly 5 digits\n";
        addErrorStyle(postcode);
    }
    return result;
}

function chkEnquiryType() {
    var enquiry = document.getElementById("enquiry");
    var result = false;
    
    if (enquiry.value == null || enquiry.value == "") {
        gErrorMsg = gErrorMsg + "Please select an enquiry type\n";
        addErrorStyle(enquiry);
        result = false;
    } else {
        removeErrorStyle(enquiry);
        result = true;
    }
    return result;
}

function chkEnquirySubject() {
    var subject = document.getElementById("subject");
    var result = false;
    
    if (subject.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Subject cannot be blank\n";
        addErrorStyle(subject);
        result = false;
    } else {
        removeErrorStyle(subject);
        result = true;
    }
    return result;
}

function chkEnquiryComments() {
    var comments = document.getElementById("en_comment");
    var result = false;
    
    if (comments.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Comments cannot be blank\n";
        addErrorStyle(comments);
        result = false;
    } else {
        removeErrorStyle(comments);
        result = true;
    }
    return result;
}

// ========================================
// REGISTER FORM VALIDATION FUNCTIONS
// ========================================
function validateRegisterForm(event) {
    "use strict";
    var isAllOK = false;
    gErrorMsg = "";  
     
    resetAllErrorStyles();
    
    // Get all form values for storage
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var workshop = document.getElementById("register").value;
    var subject = document.getElementById("subject").value;
    var wdate = document.getElementById("wdate").value;
    var wtime = document.getElementById("wtime").value;
    var participants = document.getElementById("no_ofparticipant").value;
    var comment = document.getElementById("re_comment").value;
    
    var nameOK = chkRegisterName();
    var emailOK = chkRegisterEmail();
    var phoneOK = chkRegisterPhone();
    var workshopOK = chkWorkshopType();
    var subjectOK = chkWorkshopSubject();
    var dateOK = chkWorkshopDate();
    var timeOK = chkWorkshopTime();
    var participantsOK = chkParticipants();
    var commentsOK = chkRegisterComments();
    
    if (nameOK && emailOK && phoneOK && workshopOK && subjectOK && dateOK && timeOK && participantsOK && commentsOK) {
        isAllOK = true;
        // Store data in sessionStorage before redirecting
        storeRegistration(fname, lname, email, phone, workshop, subject, wdate, wtime, participants, comment);
        // Allow form to submit normally (redirect to confirm.html)
        return true;
    } else {
        // PREVENT form submission and show alert
        event.preventDefault();
        alert(gErrorMsg);  
        // AFTER alert is closed, show field errors - ADD THIS LINE
        showFieldErrors();
        gErrorMsg = "";  
        isAllOK = false;
        return false;
    }
}

function chkRegisterName() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var pattern = /^[A-Za-z]+$/;
    var nameOk = true;
    
    if (fname.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "First name cannot be blank\n";
        addErrorStyle(fname);
        nameOk = false;
    } else if (!pattern.test(fname.value.trim())) {
        gErrorMsg = gErrorMsg + "First name must only contain alphabetical characters\n";
        addErrorStyle(fname);
        nameOk = false;
    } else if (fname.value.trim().length > 25) {
        gErrorMsg = gErrorMsg + "First name cannot exceed 25 characters\n";
        addErrorStyle(fname);
        nameOk = false;
    } else {
        removeErrorStyle(fname);
    }
    
    if (lname.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Last name cannot be blank\n";
        addErrorStyle(lname);
        nameOk = false;
    } else if (!pattern.test(lname.value.trim())) {
        gErrorMsg = gErrorMsg + "Last name must only contain alphabetical characters\n";
        addErrorStyle(lname);
        nameOk = false;
    } else if (lname.value.trim().length > 25) {
        gErrorMsg = gErrorMsg + "Last name cannot exceed 25 characters\n";
        addErrorStyle(lname);
        nameOk = false;
    } else {
        removeErrorStyle(lname);
    }
    
    return nameOk;
}

function chkRegisterEmail() {
    var email = document.getElementById("email");
    var result = false;
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Email address cannot be blank\n";
        addErrorStyle(email);
        result = false;
    } else if (pattern.test(email.value.trim())) {
        removeErrorStyle(email);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Enter a valid email address (e.g., name@domain.com)\n";
        addErrorStyle(email);
    }
    return result;
}

function chkRegisterPhone() {
    var phone = document.getElementById("phone");
    var result = false;
    var pattern = /^01[0-9]{8,9}$/;
    
    if (phone.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Phone number cannot be blank\n";
        addErrorStyle(phone);
        result = false;
    } else if (pattern.test(phone.value.trim())) {
        removeErrorStyle(phone);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Enter a valid Malaysian phone number (should start with 01, e.g., 0123456789)\n";
        addErrorStyle(phone);
    }
    return result;
}

function chkWorkshopType() {
    var workshop = document.getElementById("register");
    var result = false;
    
    if (workshop.value == null || workshop.value == "") {
        gErrorMsg = gErrorMsg + "Please select a workshop type\n";
        addErrorStyle(workshop);
        result = false;
    } else {
        removeErrorStyle(workshop);
        result = true;
    }
    return result;
}

function chkWorkshopSubject() {
    var subject = document.getElementById("subject");
    var result = false;
    
    if (subject.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Subject cannot be blank\n";
        addErrorStyle(subject);
        result = false;
    } else {
        removeErrorStyle(subject);
        result = true;
    }
    return result;
}

function chkWorkshopDate() {
    var workshopDate = document.getElementById("wdate");
    var result = false;
    
    if (workshopDate.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Workshop date cannot be blank\n";
        addErrorStyle(workshopDate);
        result = false;
    } else {
        var inputDate = new Date(workshopDate.value.trim());
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (isNaN(inputDate.getTime())) {
            gErrorMsg = gErrorMsg + "Please enter a valid workshop date\n";
            addErrorStyle(workshopDate);
            result = false;
        } else if (inputDate < today) {
            gErrorMsg = gErrorMsg + "Workshop date cannot be in the past\n";
            addErrorStyle(workshopDate);
            result = false;
        } else {
            removeErrorStyle(workshopDate);
            result = true;
        }
    }
    return result;
}

function chkWorkshopTime() {
    var workshopTime = document.getElementById("wtime");
    var result = false;
    
    if (workshopTime.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Workshop time cannot be blank\n";
        addErrorStyle(workshopTime);
        result = false;
    } else {
        // For time input, the browser ensures valid format
        removeErrorStyle(workshopTime);
        result = true;
    }
    return result;
}

function chkParticipants() {
    var participants = document.getElementById("no_ofparticipant");
    var result = false;
    var pattern = /^[1-9][0-9]?$/;
    
    if (participants.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Number of participants cannot be blank\n";
        addErrorStyle(participants);
        result = false;
    } else if (pattern.test(participants.value.trim())) {
        removeErrorStyle(participants);
        result = true;
    } else {
        result = false;
        gErrorMsg = gErrorMsg + "Number of participants must be between 1 and 99\n";
        addErrorStyle(participants);
    }
    return result;
}

function chkRegisterComments() {
    var comments = document.getElementById("re_comment");
    var result = false;
    
    if (comments.value.trim().length == 0) {
        gErrorMsg = gErrorMsg + "Comments cannot be blank\n";
        addErrorStyle(comments);
        result = false;
    } else {
        removeErrorStyle(comments);
        result = true;
    }
    return result;
}

// ==========================================
// ENHANCEMENT 1: BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
  
    if (!backToTopButton) return;
  
    // Show/hide button based on scroll position
     function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
  
    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    }
  
    // Event listeners
    window.addEventListener('scroll', toggleBackToTop);
    backToTopButton.addEventListener('click', scrollToTop);
  
    // Keyboard accessibility
    backToTopButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
        }
    });
}

// ===========================
// MAIN INITIALIZATION FUNCTION
// ===========================
function init() {
    setupDropdowns();
    populateEnquiryDropdown();
    populateWorkshopDropdown();
    populateNavigationDropdowns();
    autoFillFromUrl();
    autoFillSubject();
    autoFillWorkshopSubject();
    autoFillWorkshopFromUrl();
    highlightCurrentPage();
    initBackToTop();
    
    // Setup reset buttons for both forms
    setupResetButtons();
    
    // Check if we're on the confirmation page
    if (window.location.pathname.includes('confirm.html')) {
        initConfirmationPage();
        return;
    }
    
    var enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.onsubmit = function(event) {
            return validateEnquiryForm(event);
        };
        
        // Clear errors when form is reset (existing)
        enquiryForm.addEventListener('reset', function() {
            clearAllErrorMessages();
            resetAllErrorStyles();
            
            // Additional delay to ensure all styles are cleared
            setTimeout(function() {
                resetAllErrorStyles();
            }, 50);
        });
         
        const enquiryFields = enquiryForm.querySelectorAll('input, select, textarea');
        enquiryFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim().length > 0) {
                    removeErrorStyle(this);
                    // Clear the error message for this field
                    const errorElement = document.getElementById(this.id + '-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
            
            field.addEventListener('change', function() {
                if (this.value.trim().length > 0) {
                    removeErrorStyle(this);
                    // Clear the error message for this field
                    const errorElement = document.getElementById(this.id + '-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
    }
    
    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.onsubmit = function(event) {
            return validateRegisterForm(event);
        };
        
        // Clear errors when form is reset (existing)
        registerForm.addEventListener('reset', function() {
            clearAllErrorMessages();
            resetAllErrorStyles();
            
            // Additional delay to ensure all styles are cleared
            setTimeout(function() {
                resetAllErrorStyles();
            }, 50);
        });
         
        const registerFields = registerForm.querySelectorAll('input, select, textarea');
        registerFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim().length > 0) {
                    removeErrorStyle(this);
                    // Clear the error message for this field
                    const errorElement = document.getElementById(this.id + '-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
            
            field.addEventListener('change', function() {
                if (this.value.trim().length > 0) {
                    removeErrorStyle(this);
                    // Clear the error message for this field
                    const errorElement = document.getElementById(this.id + '-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
    }
}

window.onload = init;