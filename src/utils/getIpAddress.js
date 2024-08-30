import os from "os";

function getSystemIPAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    for (const alias of interfaces) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address; // Return the first non-internal (public) IPv4 address
      }
    }
  }

  return "IP address not found"; // If no IP address is found
}

export default getSystemIPAddress;
