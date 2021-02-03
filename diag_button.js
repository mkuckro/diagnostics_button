function diagDisplay() {
  let userAgent = navigator.userAgent;
  console.log(userAgent);

  // create table to display browser and OS info
  let table = document.querySelector('.diagTable');

  // execute getBrowserInfo and getOsInfo functions and results in variables
  let browserInfo = getBrowserInfo(userAgent);
  let osInfo = getOsInfo(userAgent);

  // create div for browser information
  let browserInfoDiv = document.createElement('div');
  browserInfoDiv.className = 'info';
  // set div text to "browser, browser version" using indices from browserInfo array
  browserInfoDiv.innerText = `${browserInfo[0]} ${browserInfo[1][1]}`;

  // create div for OS information
  let osInfoDiv = document.createElement('div');
  osInfoDiv.className = 'info';
  // set div text to "OS, OS version" using indices from osInfo array
  osInfoDiv.innerText = `${osInfo[0]} ${osInfo[1][1]}`;

  // append divs to table for display
  table.appendChild(browserInfoDiv);
  table.appendChild(osInfoDiv);
};

// object to hold regex expressions for browser/version matching
let browserRegex = {
  Edge: /Edge\/(\S+)/,
  Chrome: /Chrome\/(\S+)/,
  Safari: /Version\/(\S+)/,
  Firefox: /Firefox\/(\S+)/,
  MSIE: /MSIE\s(\d+.\d+)/
};

// object to hold regex expressions for OS/version matching
let osRegex = {
  Mac: /Mac\sOS\sX\s(.+?\d(?=\)))/,
  Windows: /Windows\s\w+\s(.+?\d(?=;))/,
  ChromeOS: /CrOS\s(\w+(?=\s))/
}

/**
 * Extracts the browser name and version number from user agent string.
 *
 * @param userAgent
 *            The user agent string to parse. If not specified, the contents of
 *            navigator.userAgent are parsed.
 *
 * @return An array containing the browser name and version number. [Browser Name, [BrowserName/Version, version]]
 */
function getBrowserInfo(userAgent) {
  let browserInfo;
  for (browser in browserRegex) {
    if (userAgent.match(browserRegex[browser]) !== null) {
      browserInfo = [browser, userAgent.match(browserRegex[browser])];
      return browserInfo;
    };
  };
  return browserInfo;
}

/**
 * Extracts the OS name and version number from user agent string.
 *
 * @param userAgent
 *            The user agent string to parse. If not specified, the contents of
 *            navigator.userAgent are parsed.
 *
 * @return An array containing the OS name and version number. [OS Name, [OSName/Version, version]]
 */
function getOsInfo(userAgent) {
  let osInfo;
  for (os in osRegex) {
    if (userAgent.match(osRegex[os]) !== null) {
      osInfo = [os, userAgent.match(osRegex[os])];
      return osInfo;
    }
  }
  return osInfo;
};
