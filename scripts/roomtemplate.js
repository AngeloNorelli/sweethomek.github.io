function addDevice(deviceId) {
  const deviceItem = document.getElementById(deviceId);
  if (!deviceItem) {
    console.error(`Device with ID ${deviceId} not found.`);
    return;
  }

  const clonedDevice = cloneDevice(deviceItem);
  const deviceContainer = createDeviceContainer(clonedDevice);
  updateDeviceList(deviceItem);
  updateDisplay(deviceContainer);
}

function cloneDevice(deviceItem) {
  const clonedDevice = deviceItem.cloneNode(true);
  clonedDevice.querySelector("button").remove();
  return clonedDevice;
}

function createDeviceContainer(clonedDevice) {
  const deviceContainer = document.createElement("div");
  deviceContainer.classList.add("device");
  deviceContainer.appendChild(clonedDevice);
  return deviceContainer;
}

function updateDeviceList(deviceItem) {
  const deviceList = document.getElementById("deviceList");
  if (deviceList) {
    deviceList.removeChild(deviceItem);
  } else {
    console.error("Device list not found.");
  }
}

function updateDisplay(deviceContainer) {
  const specificDevice = document.getElementById("specificDevice");
  if (specificDevice) {
    specificDevice.appendChild(deviceContainer);
    specificDevice.style.display = "grid";
    specificDevice.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(200px, 1fr))";
    specificDevice.style.gap = "50px";
    specificDevice.style.maxWidth = "100%";
  } else {
    console.error("Specific device container not found.");
  }
}
