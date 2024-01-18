function addDevice(deviceId) {
  const deviceItem = document.getElementById(deviceId);
  if (!deviceItem) {
    console.error(`Urzadzenie o ID ${deviceId} nie znalezione.`);
    return;
  }

  const clonedDevice = cloneDevice(deviceItem);
  const deviceContainer = createDeviceContainer(clonedDevice, deviceId);
  updateDeviceList(deviceItem);
  updateDisplay(deviceContainer);
  addButtonToDeviceDiv(deviceId);
}

function cloneDevice(deviceItem) {
  const clonedDevice = deviceItem.cloneNode(true);
  clonedDevice.querySelector("button").remove();
  return clonedDevice;
}

function createDeviceContainer(clonedDevice, deviceId) {
  const deviceContainer = document.createElement("div");
  deviceContainer.classList.add("device");
  deviceContainer.classList.add(deviceId);
  deviceContainer.appendChild(clonedDevice);
  return deviceContainer;
}

function updateDeviceList(deviceItem) {
  const deviceList = document.getElementById("deviceList");
  if (deviceList) {
    deviceList.removeChild(deviceItem);
  } else {
    console.error("Nie znaleziono urzadzenia.");
  }
}

function updateDisplay(deviceContainer) {
  const specificDevice = document.getElementById("specificDevice");
  if (specificDevice) {
    specificDevice.appendChild(deviceContainer);
    specificDevice.style.display = "grid";
    specificDevice.style.gap = "5em";
  }
}

//test
const devices = [
  {
    id: "monitoring",
    name: "Monitoring",
    icon: "videocam",
    onClick: () => toggleDevice("monitoring"),
  },
  {
    id: "temperatura",
    name: "Temperatura",
    icon: "ac_unit",
    onClick: () => toggleDevice("temperatura"),
    slider: true,
  },
  {
    id: "odkurzacz",
    name: "Odkurzacz",
    icon: "cleaning_services",
    onClick: () => toggleDevice("odkurzacz"),
  },
  {
    id: "zmywarka",
    name: "Zmywarka",
    icon: "dish",
    onClick: () => toggleDevice("zmywarka"),
  },
  {
    id: "alarm",
    name: "Alarm",
    icon: "music_note",
    onClick: () => toggleDevice("alarm"),
  },
  {
    id: "ogrodzenie",
    name: "Ogrodzenie",
    icon: "local_florist",
    onClick: () => toggleDevice("ogrodzenie"),
  },
  {
    id: "oswietlenie",
    name: "Oswietlenie",
    icon: "wb_incandescent",
    onClick: () => toggleDevice("oswietlenie"),
  },
];

function toggleDevice(deviceId) {
  const button = document.getElementById(`${deviceId}Button`);

  if (button) {
    if (button.id !== "temperaturaButton") {
      button.classList.toggle("btn-off");
    }
  } else {
    console.error(`Button with ID ${deviceId} not found.`);
  }
}

function createDeviceButton(device) {
  const button = document.createElement("button");
  button.id = `${device.id}Button`;

  if (device.slider) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "10";
    slider.max = "30";
    slider.value = "20";
    slider.className = "slider";

    const valueDisplay = document.createElement("span");
    valueDisplay.className = "slider-value";
    valueDisplay.textContent = `${slider.value} °C`;
    valueDisplay.style.fontSize = "1.2em";
    valueDisplay.style.fontWeight = "bold";

    button.appendChild(slider);
    button.appendChild(valueDisplay);
  } else {
    button.classList.add("btn-off");
  }

  button.innerHTML += `<i class="material-icons">${device.icon}</i>`;
  button.onclick = device.onClick;
  return button;
}

document.addEventListener("input", function (event) {
  const target = event.target;

  if (target.classList.contains("slider")) {
    const valueDisplay = target.nextElementSibling;

    if (valueDisplay && valueDisplay.classList.contains("slider-value")) {
      valueDisplay.textContent = `${target.value} °C`;
    }
  }
});

function addButtonToDeviceDiv(deviceId) {
  const deviceDiv = document.getElementsByClassName(deviceId);

  if (deviceDiv) {
    // Find information about the device
    const device = devices.find((d) => d.id === deviceId);

    if (device) {
      // Create a button for the device
      const button = createDeviceButton(device);

      // Add the button to the device
      deviceDiv[0].appendChild(button);
    } else {
      console.error(`Device with ID ${deviceId} not found.`);
    }
  } else {
    console.error(`Device div with ID ${deviceId} not found.`);
  }
}

setGridLayout();
//Aktualizacja grida dla roznych szerokosci
window.addEventListener("resize", setGridLayout);

function setGridLayout() {
  const specificDevice = document.getElementById("specificDevice");
  const screenWidth = window.innerWidth;

  if (specificDevice) {
    if (screenWidth < 600) {
      specificDevice.style.gridTemplateColumns = "1fr";
    } else if (screenWidth >= 600 && screenWidth < 1300) {
      specificDevice.style.gridTemplateColumns = "repeat(2, 1fr)";
      specificDevice.style.gap = "50px";
    } else if (screenWidth >= 1300 && screenWidth < 1800) {
      specificDevice.style.gridTemplateColumns = "repeat(3, 1fr)";
    } else {
      specificDevice.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
  }
}


// Odczytywanie aktualnego trybu z localStorage
const savedDarkMode = localStorage.getItem('darkMode');
const body = document.body;

if (savedDarkMode === 'true') {
  body.classList.add('dark-mode');
}

window.addEventListener('message', function(event) {
  if(event.data === 'changeTheme') {
    const updatedDarkMode = localStorage.getItem('darkMode');
    const body = document.body;
    
    if (updatedDarkMode === 'true') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
  }
});