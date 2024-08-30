const loadDevices = async (inputValue='a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();
    const devices = data.data;
    displayDevices(devices, isShowAll);
}

const displayDevices = (devices, isShowAll) => {
    const deviceContainer = document.getElementById('device-container');
    
    // Clear previous search results
    deviceContainer.textContent = '';
    // console.log(devices.length);
    
    // If search result is more than 12, show 'Show All' button
    const showAllContainer = document.getElementById('show-all-container');
    if(devices.length === 0){
        deviceContainer.innerText = 'No device available. Try different name.'
        showAllContainer.classList.add('hidden');
    }
    else if(devices.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    
    // console.log('is show all', isShowAll);
    // Show first 12 devices if not show all button clicked
    if(!isShowAll){
        devices = devices.slice(0, 12);
    }
    
    devices.forEach(device => {
        // console.log(device);
        const deviceCard = document.createElement('div');
        deviceCard.classList = `card bg-gray-300 p-4 shadow-xl`;

        deviceCard.innerHTML = `
        <figure class="px-10 pt-10 p-6"><img src="${device.image}" alt="Device" class="rounded-xl" /></figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${device.brand}</h2>
            <p>${device.phone_name}</p>
            <div class="card-actions">
                <button onclick="handleDeviceDetails('${device.slug}')" class="btn btn-accent">SHOW DETAILS</button>
            </div>
        </div>
        `
        deviceContainer.appendChild(deviceCard);
    });

    // Hide loader icon
    toggleLoader(false);
}


// Handle Show Details
const handleDeviceDetails = async (id) => {
    // console.log('details click', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const device = data.data;

    showDeviceDetails(device);
} 

// Show Device Details
const showDeviceDetails = (device) => {
    console.log(device);
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${device.image}" class="mx-auto" alt="">
    <p><span class="font-bold text-3xl">${device.name}</span></p>
    <p><span class="font-bold">Storage: </span>${device?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size: </span>${device?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">ChipSet: </span>${device?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory: </span>${device?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug: </span>${device?.slug}</p>
    <p><span class="font-bold">Release Date: </span>${device?.releaseDate}</p>
    <p><span class="font-bold">Brand: </span>${device?.brand}</p>
    <p><span class="font-bold">GPS: </span>${device?.others?.GPS? device.others.GPS : 'No GPS available'}</p>
    `;

    show_details_modal.showModal();
}


// Handle Show All devices
const handleShowAll = () =>{
    handleSearch(true);
}


// Handle search
const handleSearch = (isShowAll = false) => {
    toggleLoader(true);
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value || 'a';
    loadDevices(inputValue, isShowAll);
}




// Loader Animation
const toggleLoader = (isLoading) => {
    const loaderIcon = document.getElementById('loader-icon');
    if(isLoading){
        loaderIcon.classList.remove('hidden');
    }
    else{
        loaderIcon.classList.add('hidden');
    }
}


loadDevices('a');