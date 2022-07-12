const DOMStrings = {
    employeeBoxWrap: document.querySelector('.employee-box__wrap'),
    employeeBoxContent: '',
    controlButtons: '',
    formEmployment: '',
    employeeSocial: '',
    panel: '',
    buttonToggleIconLink: '',
    formInput: '',
    formInputDisplay: '',
    formInputEmployment: '',
}

class Buttons {
    static expandPanel(i) {
        // Commented this one since it'll affect if the 'form__input' has class 'hide' remove. The view will be cut since this
        // code below is based on the 'scrollheight'.
        // DOMStrings.panel[i].style.maxHeight = ((DOMStrings.panel[i].scrollHeight) / 10) + 'rem'
        DOMStrings.panel[i].style.maxHeight = `${100}%`
    }
    static collapsePanel(i) {
        DOMStrings.panel[i].style.maxHeight = 0
    }
    static buttonUpdate() {
        // Deep DOM traversal going on here for the 'UPDATE' button click event.
        for (let i = 0; i < DOMStrings.controlButtons.length; i++) {
            let controlButtonsChildren = DOMStrings.controlButtons[i].children
            for (let j = 0; j < controlButtonsChildren.length; j++) {
                if (controlButtonsChildren[j].classList.contains('button-update')) {
                    let buttonUpdate = controlButtonsChildren[j]
                    // The click event is triggered when an 'UPDATE' button is click which is dependent to the current [i] or index.
                    buttonUpdate.addEventListener('click', function() {
                        DOMStrings.panel[i].classList.add('show')
                        DOMStrings.buttonToggleIconLink[i].classList.add('button__toggle-icon-link-active')
                        if (DOMStrings.panel[i].classList.contains('show')) {
                            Buttons.expandPanel(i)
                            let formChildren = DOMStrings.panel[i].children[0].children[0].children[0].children
                            for (let k = 0; k < formChildren.length; k++) {
                                if (formChildren[k].classList.contains('form__group')) {
                                    let formGroup = formChildren[k]
                                    for (let l = 0; l < formGroup.children.length; l++) {
                                        let formGroupChildren = formGroup.children[l]
                                        if (formGroupChildren.classList.contains('form__input')) {
                                            formGroupChildren.classList.remove('hide')
                                        }
                                        if (formGroupChildren.classList.contains('form__input-display')) {
                                            formGroupChildren.classList.add('hide')
                                        }
                                    }
                                }
                                if (formChildren[k].classList.contains('form__employment')) {                                    
                                    let formEmploymentItem = formChildren[k].children
                                    for (let m = 0; m < formEmploymentItem.length; m++) {
                                       let formEmploymentItemChildren = formEmploymentItem[m].children
                                       for (let n = 0; n < formEmploymentItemChildren.length; n++) {
                                            if (formEmploymentItemChildren[n].classList.contains('form__employment-item-right')) {
                                                let formGroup = formEmploymentItemChildren[n].children
                                                for (let o = 0; o < formGroup.length; o++) {
                                                    let formGroupChildren = formGroup[o].children
                                                    for (let p = 0; p < formGroupChildren.length; p++) {
                                                        if (formGroupChildren[p].classList.contains('form__input')) {
                                                            formGroupChildren[p].classList.remove('hide')
                                                        }
                                                        if (formGroupChildren[p].classList.contains('form__input-display')) {
                                                            formGroupChildren[p].classList.add('hide')
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }                        
                    })
                }
            }
       }
    }
    // Down and up arrow click event.
    static togglePanel() {
        for (let i = 0; i < DOMStrings.buttonToggleIconLink.length; i++) {
            for (let j = 0; j < DOMStrings.buttonToggleIconLink[i].classList.length; j++) {
                let buttonArrowUPDown = DOMStrings.buttonToggleIconLink[i]
                if (data.employee[i].basic_info.id == buttonArrowUPDown.classList[j]) {
                    buttonArrowUPDown.addEventListener('click', function() {                        
                        DOMStrings.panel[i].classList.toggle('show')
                        buttonArrowUPDown.classList.toggle('button__toggle-icon-link-active')
                        if (DOMStrings.panel[i].classList.contains('show')) {
                            Buttons.expandPanel(i)                   
                        } else {
                            Buttons.collapsePanel(i)
                        }
                    })
                }
            }
        }
    }
}

class UI {
    // Adding and removing 'hide' class during page load.
    static hideFormInput() {
        for (let i = 0; i < DOMStrings.formInput.length; i++) {
            DOMStrings.formInput[i].classList.add('hide')
            DOMStrings.formInputDisplay[i].classList.remove('hide')
        }
        let formEmployment = DOMStrings.formEmployment
        for (let i = 0; i < formEmployment.length; i++) {
            let formEmploymentItem = formEmployment[i].children
            for (let j = 0; j < formEmploymentItem.length; j++) {
                let formEmploymentItemChildren = formEmploymentItem[j].children
                for (let k = 0; k < formEmploymentItemChildren.length; k++) {
                    if (formEmploymentItemChildren[k].classList.contains('form__employment-item-right')) {
                        let formGroup = formEmploymentItemChildren[k].children
                        for (let l = 0; l < formGroup.length; l++) {
                            let formGroupChildren = formGroup[l].children
                            for (let m = 0; m < formGroupChildren.length; m++) {
                                if (formGroupChildren[m].classList.contains('form__input')) {
                                    formGroupChildren[m].classList.add('hide')
                                }
                                if (formGroupChildren[m].classList.contains('form__input-display')) {
                                    formGroupChildren[m].classList.remove('hide')
                                }                    
                            }
                        }
                    }
                }
            }
        }
    }
    // Getting social_link values from data object within 'data.js' then storing it into an empty array, 'socialLinkValues'.
    static populateEmployeeSocialLink() {
        // Array that will hold values from 'data.employee.basic_info.social_link' from data.js where values can be null or
        // actual links of social media websites, example 'https://facebook.com'.
        let socialLinkValues = []
        // Array that will hold values from 'data.system_settings.social_platorm'.
        let socialPlatformName = []
        // Destructuring values from 'data.system_settings.social_platform' as 'social_platform variable'.
        const {system_settings: [{social_platform}]} = data
        // The 'social_platform variable', after destructuring has the values we need. Then we loop through 'social_platform length'
        // then push it the 'socialPlatformName variable' in each [i] or index of loop.
        for (let i = 0; i < social_platform.length; i++) {
            socialPlatformName.push(social_platform[i].platform_name)
        }
        // Looping through 'data.employee' using it's length so that we can get values of the 'social_link' property of our 'employee
        // object' from 'data.js'. This way, we can see which value is null and which values have actual links, then we push it to
        // 'socialLinkValues array'.
        for (let i = 0; i < data.employee.length; i++) {            
            socialLinkValues = [
                data.employee[i].basic_info.social_link.linkedin,
                data.employee[i].basic_info.social_link.facebook,
                data.employee[i].basic_info.social_link.twitter,
                data.employee[i].basic_info.social_link.github,
                data.employee[i].basic_info.social_link.dribble,
                data.employee[i].basic_info.social_link.behance,
                data.employee[i].basic_info.social_link.youtube,
                data.employee[i].basic_info.social_link.instagram
            ]
            // We will create a 'template literal' so that the social icons will show in each employee box at the front-end of this
            // project.
            let employeeSocialLinkItems = '' // Variable that'll hold the 'template literal'.
            // We loop through 'socialLinkValues array' using its length, then we check which values are not equal to ''. If the loop
            // finds a value that is not '' then we can create the 'template literal'
            for (let j = 0; j < socialLinkValues.length; j++) {                
                if (socialLinkValues[j] != '' ) {
                    employeeSocialLinkItems += `
                    <a href="#" class="employee-box__employee-social-link">
                        <img src="images/${socialPlatformName[j]}-icon.svg" alt="" class="employee-box__employee-social-icon">
                    </a>
                    `
                }
                DOMStrings.employeeSocial[i].innerHTML = employeeSocialLinkItems
            }
        }
    }
    static populateEmploymentHistory() {
        let employmentItemHTML = ''
        for (let i = 0; i < DOMStrings.employeeBoxContent.length; i++) {
            if (DOMStrings.employeeBoxContent[i].classList.contains(data.employee[i].basic_info.id)) {
                for (let j = 0; j < data.employee[i].employment_history.length; j++) {
                    employmentItemHTML += `
                    <div class="form__employment-item">
                        <div class="form__employment-item-left">&nbsp;</div>
                        <div class="form__employment-item-right">
                            <div class="form__group">
                                <label for="#" class="form__label">company</label>
                                <p class="form__input-display form__input-display form__input-display--highlight">${data.employee[i].employment_history[j].company_name}</p>
                                <input type="text" id="company" class="form__input" value="${data.employee[i].employment_history[j].company_name}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">job&nbsp;title</label>
                                <p class="form__input-display form__input-display form__input-display--highlight">${data.employee[i].employment_history[j].job_title}</p>
                                <input type="text" id="job-title" class="form__input" value="${data.employee[i].employment_history[j].job_title}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">monthly&nbsp;salary</label>
                                <p class="form__input-display form__input-display form__input-display--highlight">$${data.employee[i].employment_history[j].monthly_salary}</p>
                                <input type="text" id="monthly-salary" class="form__input" value="$${data.employee[i].employment_history[j].monthly_salary}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">employment&nbsp;status</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].employment_status}</p>
                                <input type="text" id="employment-status" class="form__input" value="${data.employee[i].employment_history[j].employment_status}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">employment&nbsp;type</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].employment_type}</p>
                                <input type="text" id="employment-type" class="form__input" value="${data.employee[i].employment_history[j].employment_type}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">start&nbsp;date</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].start_month} ${data.employee[i].employment_history[j].start_date} ${data.employee[i].employment_history[j].start_year}</p>
                                <input type="text" id="start-date" class="form__input" value="${data.employee[i].employment_history[j].start_month} ${data.employee[i].employment_history[j].start_date} ${data.employee[i].employment_history[j].start_year}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">end&nbsp;date</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].end_month} ${data.employee[i].employment_history[j].end_date} ${data.employee[i].employment_history[j].end_year}</p>
                                <input type="text" id="end-date" class="form__input" value="${data.employee[i].employment_history[j].end_month} ${data.employee[i].employment_history[j].end_date} ${data.employee[i].employment_history[j].end_year}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">size</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].size}</p>
                                <input type="text" id="size" class="form__input" value="${data.employee[i].employment_history[j].size}">
                            </div>
                            <div class="form__group">
                                <label for="#" class="form__label">industry</label>
                                <p class="form__input-display">${data.employee[i].employment_history[j].industry}</p>
                                <input type="text" id="industry" class="form__input" value="${data.employee[i].employment_history[j].industry}">
                            </div>
                        </div>
                    </div>
                    `
                }
                DOMStrings.formEmployment[i].innerHTML = employmentItemHTML           
            }
            employmentItemHTML = ''       
        }
    }
    static showControlButtons(items) {
        for (let i = 0; i < data.employee.length; i++) {
           DOMStrings.controlButtons[i].innerHTML = items
        }
    }
    static createcontrolButtons(...items) {
        const {system_settings: [, {control_button}]} = data
        let controlButtonHTML = ''
        for (let i = 0; i < items.length; i++) {
            if (items[i] = control_button[i].id) {
                controlButtonHTML += `
                <div class="button__default control-buttons__btn button-${control_button[i].button_name}">
                    <a href="#${data.employee[i].basic_info.id}" class="button__default--primary">${control_button[i].button_name}</a>
                </div>
                `
            }
        }
        return controlButtonHTML
        //controlButtonHTML = ''
    }
    static showEmployeeItems() {
        let employeeHTML = ''
        for (let i = 0; i < data.employee.length; i++) {
            employeeHTML += `
            <div class="employee-box__content ${data.employee[i].basic_info.id} id="${data.employee[i].basic_info.id}">
                <div class="employee-box__basic-info">
                    <div class="button__toggle">
                        <div class="button__toggle-icon">
                            <div class="button__toggle-icon-wrap">
                                <a href="#${data.employee[i].basic_info.id}" class="button__toggle-icon-link ${data.employee[i].basic_info.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10.423" height="11.168" viewBox="0 0 10.423 11.168">
                                        <g id="arrow-up" transform="translate(98.423 87.168) rotate(180)">
                                        <path id="Path_11" data-name="Path 11" d="M93.212,249.956a.742.742,0,0,1-.526-.218l-4.467-4.467a.745.745,0,0,1,1.053-1.053l3.941,3.941,3.941-3.941a.745.745,0,0,1,1.053,1.053l-4.467,4.467A.742.742,0,0,1,93.212,249.956Z" transform="translate(0 -162.788)"/>
                                        <path id="Line_1" data-name="Line 1" d="M-23.255-13.453A.745.745,0,0,1-24-14.2v-9.058A.745.745,0,0,1-23.255-24a.745.745,0,0,1,.745.745V-14.2A.745.745,0,0,1-23.255-13.453Z" transform="translate(116.467 100)"/>
                                        </g>
                                    </svg>
                                </a>
                            </div>                                            
                        </div>                                        
                    </div>
                    <div class="employee-box__left">
                        <img src="images/${data.employee[i].basic_info.profile_image}" alt="${data.employee[i].basic_info.first_name} ${data.employee[i].basic_info.last_name} profile picture" class="employee-box__profile-image">
                    </div>
                    <div class="employee-box__right">
                        <div class="employee-box__employee-id">
                            <p class="employee-box__employee-id-text">${data.employee[i].basic_info.id}</p>
                        </div>
                        <div class="employee-box__employee-name heading">
                            <p class="employee-box__employee-name-text heading__primary">${data.employee[i].basic_info.first_name} ${data.employee[i].basic_info.middle_name} ${data.employee[i].basic_info.last_name}</p>
                        </div>
                        <div class="employee-box__employee-job">
                            <p class="employee-box__employee-job-text">${data.employee[i].basic_info.job_title}</p>
                        </div>
                        <div class="employee-box__employee-email">
                            <a class="employee-box__employee-email-text" href="mailto:${data.employee[i].basic_info.email}">${data.employee[i].basic_info.email}</a>
                        </div>
                        <div class="employee-box__employee-social"></div>
                    </div>
                </div>
                <div class="control-buttons"></div>
                <div class="panel ${data.employee[i].basic_info.id}">
                    <div class="panel__wrap">
                        <div class="panel__content">
                            <form action="#" class="form">
                                <div class="form__heading">
                                    <p class="heading__primary">current work</p>
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">company</label>
                                    <p class="form__input-display form__input-display--highlight">${data.employee[i].current_work.company}</p>
                                    <input type="text" id="company" class="form__input" value="${data.employee[i].current_work.company}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">job&nbsp;title</label>
                                    <p class="form__input-display form__input-display--highlight">${data.employee[i].current_work.job_title}</p>
                                    <input type="text" id="job_title" class="form__input" value="${data.employee[i].current_work.job_title}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">monthly&nbsp;salary</label>
                                    <p class="form__input-display form__input-display--highlight">$${data.employee[i].current_work.monthly_salary}</p>
                                    <input type="text" id="mohtly-salary" class="form__input" value="$${data.employee[i].current_work.monthly_salary}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">department</label>
                                    <p class="form__input-display">${data.employee[i].current_work.department}</p>
                                    <input type="text" id="department" class="form__input" value="${data.employee[i].current_work.department}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">date&nbsp;hired</label>
                                    <p class="form__input-display">${data.employee[i].current_work.hire_month} ${data.employee[i].current_work.hire_date} ${data.employee[i].current_work.hire_year}</p>
                                    <input type="text" id="date-hired" class="form__input" value="${data.employee[i].current_work.hire_month} ${data.employee[i].current_work.hire_date} ${data.employee[i].current_work.hire_year}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">employment&nbsp;status</label>
                                    <p class="form__input-display">${data.employee[i].current_work.employment_status}</p>
                                    <input type="text" id="employment-status" class="form__input" value="${data.employee[i].current_work.employment_status}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">employment&nbsp;type</label>
                                    <p class="form__input-display">${data.employee[i].current_work.employment_type}</p>
                                    <input type="text" id="employment-type" class="form__input" value="${data.employee[i].current_work.employment_type}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">size</label>
                                    <p class="form__input-display">${data.employee[i].current_work.size}</p>
                                    <input type="text" id="size" class="form__input" value="${data.employee[i].current_work.size}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">industry</label>
                                    <p class="form__input-display">${data.employee[i].current_work.industry}</p>
                                    <input type="text" id="industry" class="form__input" value="${data.employee[i].current_work.industry}">
                                </div>
                                
                                <div class="form__heading">
                                    <p class="heading__primary">personal details</p>
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">address</label>
                                    <p class="form__input-display">${data.employee[i].personal_details.address}</p>
                                    <input type="text" id="address" class="form__input" value="${data.employee[i].personal_details.address}">
                                </div><div class="form__group">
                                    <label for="#" class="form__label">date&nbsp;of&nbsp;birth</label>
                                    <p class="form__input-display">${data.employee[i].personal_details.birth_month} ${data.employee[i].personal_details.birth_date} ${data.employee[i].personal_details.birth_year}</p>
                                    <input type="text" id="date-of-birth" class="form__input" value="${data.employee[i].personal_details.birth_month} ${data.employee[i].personal_details.birth_date} ${data.employee[i].personal_details.birth_year}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">nationality</label>
                                    <p class="form__input-display">${data.employee[i].personal_details.nationality}</p>
                                    <input type="text" id="nationality" class="form__input" value="${data.employee[i].personal_details.nationality}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">gender</label>
                                    <p class="form__input-display">${data.employee[i].personal_details.gender}</p>
                                    <input type="text" id="gender" class="form__input" value="${data.employee[i].personal_details.gender}">
                                </div>
                                <div class="form__group">
                                    <label for="#" class="form__label">martital&nbsp;status</label>
                                    <p class="form__input-display">${data.employee[i].personal_details.marital_status}</p>
                                    <input type="text" id="marital-status" class="form__input" value="${data.employee[i].personal_details.marital_status}">
                                </div>
                                
                                <div class="form__heading">
                                    <p class="heading__primary">employment history</p>
                                </div>
                                <div class="form__employment"></div>                            
                            </form>
                            
                        </div>
                    </div>
                </div>  
            </div>
            `
        }
        DOMStrings.employeeBoxWrap.innerHTML = employeeHTML
        // Since all the important content are loaded after the template literal, 'employeeHTML', we can add some class names to our 'DOMStrings object' 
        // which will be crucial for this project.        
        DOMStrings.controlButtons = document.querySelectorAll('.control-buttons')
        DOMStrings.formEmployment = document.querySelectorAll('.form__employment')
        DOMStrings.employeeBoxContent = document.querySelectorAll('.employee-box__content')
        DOMStrings.employeeSocial = document.querySelectorAll('.employee-box__employee-social')
        DOMStrings.buttonToggleIconLink = document.querySelectorAll('.button__toggle-icon-link')
        DOMStrings.panel = document.querySelectorAll('.panel')
        DOMStrings.formInput = document.querySelectorAll('.form__input')
        DOMStrings.formInputDisplay = document.querySelectorAll('.form__input-display')
        DOMStrings.formInputEmployment = document.querySelectorAll('.form__employment')
    }    
}


// Page load.
document.addEventListener('DOMContentLoaded', function() {
    UI.showEmployeeItems()
    let items = UI.createcontrolButtons('update', 'delete')
    UI.showControlButtons(items)
    UI.populateEmploymentHistory()
    UI.populateEmployeeSocialLink()
    UI.hideFormInput()
    Buttons.togglePanel()
    Buttons.buttonUpdate()
})


