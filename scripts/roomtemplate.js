function addDevice(deviceId) {
  const deviceItem = document.getElementById(deviceId);
  if (!deviceItem) {
    console.error(`Urzadzenie o ID ${deviceId} nie znalezione.`);
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
    console.error("Nie znaleziono urzadzenia.");
  }
}

function updateDisplay(deviceContainer) {
  const specificDevice = document.getElementById("specificDevice");
  if (specificDevice) {
    specificDevice.appendChild(deviceContainer);
    specificDevice.style.display = "grid";
    specificDevice.style.gap = "3em";
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
