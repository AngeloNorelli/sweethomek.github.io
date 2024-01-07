// devices.js
const devices = [
  {
    id: "alarm",
    name: "Alarm",
    icon: "fas fa-bell",
    onClick: () => toggleDevice("alarm"),
  },
  {
    id: "ogrodzenie",
    name: "Ogrodzenie",
    icon: "fas fa-tree",
    onClick: () => toggleDevice("ogrodzenie"),
  },
  // Add more devices as needed
];

function toggleDevice(deviceId) {
  console.log(`Toggling device with ID: ${deviceId}`);
}

export function createDeviceButton(device) {
  const button = document.createElement("button");
  button.id = `${device.id}Button`;
  button.innerHTML = `<i class="${device.icon}"></i> Toggle ${device.name}`;
  button.onclick = device.onClick;
  return button;
}

export function addButtonToDeviceDiv(deviceId) {
  const deviceDiv = document.getElementsByClassNames(deviceId);

  if (deviceDiv) {
    // Find the corresponding device information
    const device = devices.find((d) => d.id === deviceId);

    if (device) {
      // Create the button using the separate function
      const button = createDeviceButton(device);

      // Append the button to the device div
      deviceDiv.appendChild(button);
    } else {
      console.error(`Device with ID ${deviceId} not found.`);
    }
  } else {
    console.error(`Device div with ID ${deviceId} not found.`);
  }
}

export { devices, toggleDevice };
