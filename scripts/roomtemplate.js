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
// update the list with devices
function addDeviceBackToList(deviceItem) {
  const deviceList = document.getElementById("deviceList");
  var addButton = document.createElement("button");
  console.log(deviceItem.id);
  const onclickFunction = `addDevice('${deviceItem.id}')`;
  addButton.setAttribute("onclick", onclickFunction);
  addButton.id = "add_button";
  addButton.textContent = "+";
  if (deviceList) {
    deviceItem.appendChild(addButton);
    deviceList.appendChild(deviceItem);
  } else {
    console.error("Device list not found.");
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
    icon: "free_breakfast",
    time: true,
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
    bright: true,
    icon: "wb_incandescent",
    onClick: () => toggleDevice("oswietlenie"),
  },
  {
    id: "piekarnik",
    name: "Piekarnik",
    icon: "access_alarm",
    time: true,
    onClick: () => toggleDevice("piekarnik"),
  },
  {
    id: "kosiarka",
    name: "Kosiarka",
    icon: "grass",
    time: true,
    onClick: () => toggleDevice("kosiarka"),
  },
  {
    id: "zraszacz",
    name: "Zraszacz",
    icon: "water_drop",
    time: true,
    onClick: () => toggleDevice("zraszacz"),
  },
];

function toggleDevice(deviceId) {
  const button = document.getElementById(`${deviceId}Button`);

  if (button) {
    // if (button.id !== "temperaturaButton") {
    button.classList.toggle("btn-off");
    // }
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
    button.classList.add("btn-off");

    const valueDisplay = document.createElement("span");
    valueDisplay.className = "slider-value";
    valueDisplay.textContent = `${slider.value} °C`;
    valueDisplay.style.fontSize = "1.2em";
    valueDisplay.style.fontWeight = "bold";

    button.appendChild(slider);
    button.appendChild(valueDisplay);
    button.classList.add("btn-off");
  }

  if (device.time) {
    // Container for start time
    const startContainer = document.createElement("div");
    startContainer.className = "time-container";

    // Label for start time
    const startLabel = document.createElement("label");
    startLabel.textContent = "Start:";
    startLabel.htmlFor = "startTime";
    startContainer.appendChild(startLabel);

    // Start time input
    const startTimeInput = document.createElement("input");
    startTimeInput.type = "time";
    startTimeInput.id = "startTime";
    startTimeInput.className = "start-time-input";
    startContainer.appendChild(startTimeInput);

    // Container for end time
    const endContainer = document.createElement("div");
    endContainer.className = "time-container";

    // Label for end time
    const endLabel = document.createElement("label");
    endLabel.textContent = "Stop:";
    endLabel.htmlFor = "endTime";
    endContainer.appendChild(endLabel);

    // End time input
    const endTimeInput = document.createElement("input");
    endTimeInput.type = "time";
    endTimeInput.id = "endTime";
    endTimeInput.className = "end-time-input";
    endContainer.appendChild(endTimeInput);

    // Append the containers to the button
    button.appendChild(startContainer);
    button.appendChild(endContainer);
  }

  button.innerHTML += `<i class="material-icons">${device.icon}</i>`;
  button.onclick = device.onClick;
  return button;
}

document.addEventListener("input", function (event) {
  const target = event.target;
  event.stopPropagation();
  // event.preventDefault();

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
    const device = devices.find((d) => d.id === deviceId);

    if (device) {
      const button = createDeviceButton(device);
      // remove device button
      const removeDeviceButton = createRemoveDeviceButton(device);
      deviceDiv[0].appendChild(button);
      deviceDiv[0].appendChild(removeDeviceButton);
    } else {
      console.error(`Device with ID ${deviceId} not found.`);
    }
  } else {
    console.error(`Device div with ID ${deviceId} not found.`);
  }
}

setGridLayout();
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
const savedDarkMode = localStorage.getItem("darkMode");
const body = document.body;

if (savedDarkMode === "true") {
  body.classList.add("dark-mode");
}

window.addEventListener("storage", function (event) {
  if (event.key === "darkMode") {
    const updatedDarkMode = localStorage.getItem("darkMode");
    const body = document.body;

    if (updatedDarkMode === "true") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }
});

// funkcje do obslugi usuwania urzadzen

function createRemoveDeviceButton(device) {
  const removeButton = document.createElement("button");
  removeButton.id = `remove${device.id}Button`;
  removeButton.classList.add("remove-device-button");
  removeButton.innerHTML += `<i class="material-icons">close</i>`;

  removeButton.addEventListener("click", () => removeDevice(device.id));
  return removeButton;
}

function removeDevice(deviceId) {
  const deviceDiv = document.getElementsByClassName(deviceId);
  const deviceItem = document.getElementById(deviceId);
  if (deviceDiv) {
    deviceDiv[0].remove();
    addDeviceBackToList(deviceItem);
  } else {
    console.error(`Device div with ID ${deviceId} not found.`);
  }
}
