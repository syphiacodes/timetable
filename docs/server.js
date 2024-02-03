function updateDigitalClock() {
  const digitalClock = document.getElementById("digital-clock");
  const now = new Date();
  const options = { timeZone: "Europe/Zurich" };
  const hours = now
    .toLocaleString("en-US", { hour: "numeric", hour12: false, ...options })
    .padStart(2, "0");
  const minutes = now
    .toLocaleString("en-US", { minute: "numeric", ...options })
    .padStart(2, "0");
  const seconds = now
    .toLocaleString("en-US", { second: "numeric", ...options })
    .padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  digitalClock.textContent = timeString;
}

setInterval(updateDigitalClock, 1000);

async function fetchTimetable() {
  try {
    console.log("Fetching timetable...");
    const apiUrl =
      "https://transport.opendata.ch/v1/stationboard?station=Buchs_SG&limit=10";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    if (data && data.stationboard) {
      console.log("Displaying timetable...");
      displayTimetable(data.stationboard);
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("Error fetching timetable:", error.message);
  }
}

function updateTimetable() {
  setInterval(fetchTimetable, 60000);
}

console.log("Page loaded. Fetching timetable...");
fetchTimetable();

updateTimetable();

function formatTime(timestamp) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Europe/Zurich",
  };

  return new Date(timestamp * 1000).toLocaleTimeString("en-US", options);
}

function getImageSource(category) {
  switch (category) {
    case "IR":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path d="M9.388 4.2h4.042l-5 11.6H4.37L9.388 4.2ZM26.092 12.366a.922.922 0 0 0 .843-.553L30.216 4.2H16.13l-5.001 11.6h4.025l3.786-8.69h5.973l-1.197 2.775-5.209-.019L22.71 15.8h4.582l-3.114-3.434h1.915Z" fill="#fff"></path></svg>';
    case "RE":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><g clip-path="url("/angular/icon-overview#sbb-icon-3586 #a")"><path d="M4.16 4.234h5.6c1.108 0 1.957.174 2.547.522.49.285.865.664 1.124 1.139.258.475.387 1.01.387 1.606 0 .675-.163 1.263-.49 1.764-.322.5-.773.86-1.353 1.075a1.95 1.95 0 0 1 1.203.855c.184.28.308.572.371.878.064.306.145 1.004.245 2.096.074.802.188 1.3.34 1.495l.111.135h-2.634a1.979 1.979 0 0 1-.197-.625c-.037-.253-.088-.839-.15-1.756-.064-.818-.264-1.382-.602-1.693-.332-.317-.902-.475-1.709-.475h-2.27V15.8H4.16V4.234Zm2.523 1.985V9.4h2.413c.775 0 1.32-.11 1.637-.332.401-.28.601-.701.601-1.266 0-.548-.171-.949-.514-1.202-.343-.253-.883-.38-1.621-.38H6.683ZM24.647 4.234V6.37h-6.154v2.468h5.64v1.985h-5.64v2.84h6.265v2.136H15.97V4.234h8.677Z" fill="#fff"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h59v20H0z"></path></clipPath></defs></svg>';
    case "NJ":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.966 15.78h-2.23L7.594 7.964 5.96 15.78H3.73L6.158 4.148h2.238l3.15 7.784 1.626-7.784h2.222L12.966 15.78Zm9.469-11.632h2.349l-1.468 7.046c-.392 1.867-.905 3.131-1.54 3.793-.634.66-1.61.991-2.927.991-1.117 0-1.952-.256-2.508-.77-.555-.512-.833-1.21-.833-2.094 0-.185.013-.391.04-.619l2.214-.238a4.423 4.423 0 0 0-.048.58c0 .37.106.653.317.848.212.196.537.294.976.294.614 0 1.045-.18 1.293-.54.186-.275.41-1.05.675-2.325l1.46-6.966Z" fill="#fff"></path></svg>';
    case "RJX":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.093 15.802h-2.39L6.133 4.2h5.152c.886 0 1.576.091 2.07.273.493.182.891.516 1.194 1.001.304.486.456 1.074.456 1.765 0 .987-.296 1.8-.887 2.442-.59.64-1.485 1.038-2.683 1.19.306.275.594.636.863 1.085.533.907 1.126 2.19 1.78 3.846h-2.564c-.205-.654-.609-1.675-1.21-3.063-.328-.749-.676-1.253-1.045-1.511-.227-.153-.623-.23-1.187-.23h-.974l-1.005 4.804Zm1.37-6.545h1.266c1.282 0 2.133-.076 2.552-.23.42-.152.748-.392.985-.72.238-.327.356-.67.356-1.028 0-.423-.171-.74-.514-.95-.211-.127-.668-.19-1.37-.19H8.112l-.649 3.118ZM22.375 4.2h2.342l-1.464 7.028c-.39 1.862-.902 3.123-1.535 3.783-.633.66-1.607.989-2.92.989-1.114 0-1.947-.256-2.501-.768-.554-.511-.831-1.208-.831-2.09 0-.184.013-.39.04-.616l2.207-.238a4.432 4.432 0 0 0-.047.578c0 .37.105.652.316.847.212.195.536.293.974.293.612 0 1.042-.18 1.29-.539.184-.274.409-1.047.673-2.318L22.376 4.2Zm4.538 11.602h-3.087l5.12-5.872-2.88-5.73h2.493l1.132 2.176c.037.08.295.615.775 1.607.032.053.066.124.103.214a81.605 81.605 0 0 1 1.623-1.931L34.02 4.2h3l-5.311 6.11 2.857 5.492h-2.691l-.87-1.749c-.454-.923-.755-1.585-.903-1.986-.206.31-.736.955-1.59 1.93l-1.6 1.805Z" fill="#fff"></path></svg>';
    case "EN":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.287 15.8h5.288l3.428-3.508H9.138l1.77-1.774h7.933l1.815-1.778h-7.933l1.748-1.799h7.935l2.71-2.741H12.588a1.412 1.412 0 0 0-.807.2l-.246.182-.27.223-6.834 6.858c-.15.176-.237.398-.246.63a.693.693 0 0 0 .203.517l.426.382L7.39 15.24l.381.335.316.158c.034.002.067.01.099.024a.88.88 0 0 1 .075.032l.026.011Zm24.828-3.125V4.2h-5.847L15.726 15.8h5.357l8.469-8.499V15.8h5.849L46.962 4.2h-5.4l-8.448 8.475Z" fill="#fff"></path></svg>';
    case "IC":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path d="M9.22 4.2h4.057L8.259 15.8H4.186L9.22 4.2ZM15.948 4.2h14.395l-1.49 3.445h-10.28l-2.042 4.71h10.285l-1.49 3.445H10.93l5.017-11.6Z" fill="#fff"></path></svg>';
    case "OJV":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path d="M4.116 11.252c0-.686.103-1.408.308-2.168.27-1.017.678-1.9 1.227-2.65a5.956 5.956 0 0 1 2.088-1.771c.838-.438 1.793-.657 2.863-.657 1.435 0 2.592.446 3.473 1.337.886.891 1.329 2.072 1.329 3.544a7.82 7.82 0 0 1-.862 3.551c-.575 1.144-1.356 2.025-2.342 2.642s-2.101.926-3.346.926c-1.08 0-1.988-.245-2.72-.736-.734-.49-1.253-1.097-1.56-1.82a5.632 5.632 0 0 1-.458-2.198Zm2.357-.048c0 .796.243 1.464.728 2.002.485.537 1.123.806 1.914.806.644 0 1.26-.21 1.851-.633.596-.427 1.087-1.07 1.472-1.93.39-.864.585-1.706.585-2.523 0-.912-.245-1.627-.736-2.144C11.797 6.26 11.172 6 10.412 6c-1.165 0-2.114.544-2.847 1.63a6.29 6.29 0 0 0-1.092 3.575ZM21.942 9.606h5.189l-1.044 4.976c-.612.395-1.363.73-2.255 1.004a9.126 9.126 0 0 1-2.713.412c-1.434 0-2.534-.324-3.298-.973-1.044-.886-1.566-2.17-1.566-3.852 0-1.129.224-2.21.672-3.244.538-1.244 1.303-2.21 2.294-2.895.991-.685 2.157-1.028 3.496-1.028 1.34 0 2.413.311 3.22.933.812.623 1.35 1.53 1.613 2.721l-2.223.254c-.195-.654-.511-1.147-.949-1.48-.432-.332-.978-.498-1.637-.498-.77 0-1.477.2-2.12.601-.643.401-1.147 1.02-1.51 1.86-.365.838-.547 1.752-.547 2.744 0 .976.222 1.698.665 2.167.443.464 1.091.696 1.946.696.511 0 1.036-.07 1.574-.213a7.268 7.268 0 0 0 1.392-.522l.356-1.725h-2.958l.403-1.938ZM33.408 15.8h-2.547l-2.08-11.596h2.38l1.472 8.772 4.801-8.772H39.8L33.408 15.8Z" fill="#fff"></path></svg>';
    case "PE":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.002 9.378h.745c1.275 0 2.127-.08 2.554-.24a2.09 2.09 0 0 0 1.009-.769c.246-.352.368-.739.368-1.16 0-.284-.063-.516-.188-.697a1.066 1.066 0 0 0-.528-.397c-.227-.083-.733-.124-1.518-.124h-1.73l-.712 3.387Zm-1.338 6.423H3.246L5.705 4.06h4.772c.849 0 1.52.1 2.014.3.494.2.885.532 1.173.993.289.462.433 1.013.433 1.654 0 .593-.115 1.17-.345 1.73-.23.56-.511 1.009-.844 1.345a3.616 3.616 0 0 1-1.077.765c-.385.173-.903.305-1.554.396-.38.054-1.089.08-2.13.08H6.601l-.937 4.477ZM13.602 15.8l2.45-11.739h8.705l-.408 1.962h-6.286l-.56 2.667h6.077l-.408 1.962h-6.078l-.737 3.187h6.83l-.416 1.962h-9.169Z" fill="#fff"></path></svg>';
    case "ICE":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.855 6.511a4.403 4.403 0 0 0-1.11-.498 5.199 5.199 0 0 0-1.473-.183c-1.302 0-2.367.427-3.195 1.28-.828.852-1.242 1.954-1.242 3.305 0 1.108.309 2.01.927 2.708a3.058 3.058 0 0 0 2.4 1.047c.381.002.76-.048 1.127-.15.444-.14.872-.329 1.275-.564l-.365 2.226c-.154.033-.37.077-.645.133-.276.055-.55.1-.82.132a9.31 9.31 0 0 1-1.084.05c-1.634 0-2.914-.482-3.841-1.445-.928-.964-1.391-2.304-1.391-4.02 0-1.983.607-3.567 1.82-4.752 1.215-1.185 2.849-1.777 4.902-1.777a9.38 9.38 0 0 1 1.697.124c.436.083.734.15.894.2.16.05.394.13.703.24l-.579 1.944ZM6.62 4.202h2.417L6.603 15.798H4.186L6.62 4.202Zm21.474 0h-6.805l-2.434 11.596h6.888l.397-1.828h-4.57l.68-3.256h4.055l.365-1.827h-4.04l.596-2.857h4.52l.348-1.828Z" fill="#fff"></path></svg>';
    case "ICN":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.842 6.502Zm0 0 .58-1.947c-.32-.11-.572-.191-.754-.24a7.777 7.777 0 0 0-.522-.126c-.34-.064-.683-.111-1.028-.141-.41-.039-.78-.058-1.111-.058a7.372 7.372 0 0 0-2.694.474 5.905 5.905 0 0 0-3.44 3.41 7.15 7.15 0 0 0-.481 2.67c0 1.73.492 3.1 1.475 4.11.907.886 2.2 1.33 3.88 1.33.391-.002.781-.03 1.169-.083a16.35 16.35 0 0 0 1.268-.216l.365-2.23c-.38.227-.782.411-1.202.55-.374.112-.762.168-1.152.166a3.483 3.483 0 0 1-1.385-.266 2.933 2.933 0 0 1-1.06-.766 3.524 3.524 0 0 1-.68-1.197 4.73 4.73 0 0 1-.241-1.547 5.01 5.01 0 0 1 .332-1.855c.208-.541.524-1.033.928-1.448a4.148 4.148 0 0 1 1.418-.94 4.79 4.79 0 0 1 1.815-.332 4.91 4.91 0 0 1 1.26.15c.44.126.863.305 1.26.532ZM6.606 4.189l-2.42 11.612h2.42L9.044 4.19H6.606Zm12.17 11.612L21.263 4.19h2.934l2.47 8.817h.034l1.89-8.817h2.172l-2.487 11.612h-2.984l-2.421-8.9h-.017l-1.857 8.9h-2.221Z" fill="#fff"></path></svg>';
    case "BEX":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m4.186 15.8 2.42-11.6h3.952c.6-.013 1.2.013 1.798.08.508.058.998.22 1.443.474.383.225.694.554.899.95.207.406.313.857.307 1.313a2.693 2.693 0 0 1-.536 1.673 3.269 3.269 0 0 1-1.656 1.073 2.6 2.6 0 0 1 1.392.874c.327.4.504.903.5 1.42a3.655 3.655 0 0 1-.59 1.982 3.327 3.327 0 0 1-1.633 1.35c-.694.274-1.643.411-2.847.411h-5.45Zm3.817-6.916h1.813a6.286 6.286 0 0 0 1.759-.174 1.472 1.472 0 0 0 1.072-1.416c.01-.266-.08-.526-.252-.728a1.262 1.262 0 0 0-.717-.38 9.593 9.593 0 0 0-1.254-.047H8.578l-.575 2.745Zm1.246 5.049H6.954l.63-3.03h2.84c.662 0 1.135.124 1.42.375.277.237.433.587.425.953a1.56 1.56 0 0 1-.296.902 1.64 1.64 0 0 1-.788.614c-.329.124-.974.186-1.936.186ZM15.34 15.8l2.413-11.6h8.572l-.402 1.939h-6.19l-.553 2.635h5.986l-.402 1.938h-5.986l-.725 3.15h6.726l-.41 1.938H15.34Zm9.096 0h3.076l1.593-1.804c.56-.616 1.09-1.26 1.584-1.93.148.4.447 1.062.9 1.985l.867 1.749h2.681l-2.847-5.491L37.582 4.2h-2.989l-1.822 2.065a81.584 81.584 0 0 0-1.616 1.93 1.653 1.653 0 0 0-.103-.213l-.773-1.606L29.152 4.2h-2.484l2.87 5.729-5.102 5.871Z" fill="#fff"></path></svg>';
    case "CNL":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.415 11.156a.267.267 0 0 1 .225-.15c.1 0 .15.094.15.282v.037l-.9 4.55c-.05.137-.131.206-.243.206a.165.165 0 0 1-.188-.188l-.018-.188c-.038-.338-.2-.507-.488-.507h-.112l-.094.019-.112.037-.45.188a6.997 6.997 0 0 1-2.829.564c-1.548 0-2.797-.463-3.746-1.39-.95-.928-1.424-2.15-1.424-3.666a6.662 6.662 0 0 1 2.042-4.87 6.617 6.617 0 0 1 4.852-2.048 6.249 6.249 0 0 1 2.735.64l.73.337c.109.042.223.067.338.076.25 0 .462-.163.637-.49l.187-.375.075-.075.132-.038a.168.168 0 0 1 .168.15l.019.038v.075l-1.05 4.512-.037.244-.093.15a.428.428 0 0 1-.169.076l-.094-.038-.056-.075v-.658a4.6 4.6 0 0 0-.937-2.914c-.624-.802-1.392-1.203-2.304-1.203-1.236 0-2.31.733-3.222 2.2-.912 1.466-1.368 3.189-1.368 5.17 0 2.505.874 3.759 2.623 3.759 1.236 0 2.198-.395 2.885-1.185a15.87 15.87 0 0 0 1.63-2.18l.168-.338.244-.546.037-.056.02-.056.037-.076Zm3.597 1.297c-.101.432-.158.873-.169 1.316-.01.39.098.773.31 1.1a.9.9 0 0 0 .758.46l.206.02h.056c.125.037.188.106.188.206a.616.616 0 0 1-.094.188l-.131.056H15.07a.165.165 0 0 1-.187-.188l.019-.094a.44.44 0 0 1 .262-.132l.169-.037a2.39 2.39 0 0 0 1.405-.874c.362-.457.63-1.112.805-1.964l1.405-6.843-.224-.338a1.417 1.417 0 0 0-1.068-.677h-.075c-.225 0-.337-.075-.337-.225 0-.15.137-.226.412-.226h3.297l4.403 8.027 1.086-5.076.056-.282c.028-.13.047-.262.057-.394.012-.15.018-.289.018-.414 0-.777-.343-1.24-1.03-1.39l-.225-.039-.112-.056-.056-.15c0-.15.068-.226.206-.226h3.915a.16.16 0 0 1 .169.094l.018.094a.226.226 0 0 1-.206.244l-.168.038c-.37.018-.72.164-.993.414a2.71 2.71 0 0 0-.768.996l-.15.357-.131.395L25 16.025l-.02.019v.037a.311.311 0 0 1-.205.113.197.197 0 0 1-.169-.075 6.95 6.95 0 0 1-.3-.526l-4.983-9.287-1.311 6.147Zm9.61 3.159c0 .125.088.187.263.187h8.917l1.537-4.135.075-.245c0-.112-.063-.169-.188-.169l-.169.075-.112.207-.056.132a6.778 6.778 0 0 1-2.183 2.585c-.993.733-1.926 1.1-2.8 1.1-.637 0-.956-.264-.956-.79.01-.186.028-.371.056-.555.038-.282.075-.504.113-.667l1.61-7.557c.15-.74.482-1.109.994-1.109h.187l.225-.019c.225 0 .337-.075.337-.225v-.038c0-.125-.05-.188-.15-.188H30.49c-.287 0-.431.075-.431.226 0 .125.119.213.356.263h.056c.475.113.712.382.712.808 0 .05-.01.154-.028.31-.019.157-.053.392-.103.705l-1.555 7.425c-.187.815-.612 1.266-1.274 1.354l-.356.056a.247.247 0 0 0-.244.263Z" fill="#fff"></path></svg>';
    case "EXT":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path d="M3.669 15.8 6.104 4.132h8.651l-.405 1.95H8.102l-.557 2.65h6.04l-.405 1.95H7.139l-.733 3.168h6.79l-.414 1.95H3.669ZM16.678 15.8h-3.104l5.15-5.905-2.898-5.763h2.508l1.138 2.189c.037.08.297.618.78 1.616.032.053.066.124.103.214a81.91 81.91 0 0 1 1.632-1.941l1.838-2.078h3.017l-5.34 6.145 2.873 5.523h-2.707l-.875-1.759c-.456-.928-.759-1.594-.907-1.998-.207.314-.74.96-1.6 1.942L16.678 15.8ZM30.882 15.8h-2.404l2.037-9.718h-3.422l.406-1.95h9.193l-.406 1.95H32.91l-2.03 9.718Z" fill="#fff"></path></svg>';
    case "GEX":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.856 9.605h5.173l-1.041 4.977a9.018 9.018 0 0 1-2.244 1.005 9.108 9.108 0 0 1-2.708.411c-1.43 0-2.526-.324-3.289-.973-1.04-.886-1.561-2.17-1.561-3.853a8.093 8.093 0 0 1 .67-3.244 6.597 6.597 0 0 1 2.287-2.896 5.96 5.96 0 0 1 3.486-1.03c1.335 0 2.406.312 3.213.935.807.622 1.342 1.53 1.605 2.722l-2.216.253a2.798 2.798 0 0 0-.942-1.48 2.612 2.612 0 0 0-1.637-.498 3.805 3.805 0 0 0-3.62 2.46 6.843 6.843 0 0 0-.544 2.746c0 .976.221 1.697.663 2.164.442.467 1.088.7 1.94.7a5.993 5.993 0 0 0 1.57-.217c.479-.124.944-.298 1.387-.518l.355-1.725h-2.95l.403-1.939Zm5.602 6.196 2.413-11.6h8.572l-.402 1.938h-6.19l-.552 2.635h5.985l-.402 1.939h-5.986l-.725 3.149h6.727l-.41 1.939h-9.03Zm9.096 0h3.076l1.593-1.805c.56-.616 1.09-1.26 1.585-1.93.147.4.446 1.063.898 1.986l.868 1.749h2.681l-2.847-5.492L37.7 4.201H34.71L32.89 6.266a81.597 81.597 0 0 0-1.616 1.93 1.64 1.64 0 0 0-.103-.213l-.773-1.606L29.27 4.2h-2.484l2.87 5.728-5.102 5.872Z" fill="#fff"></path></svg>';
    case "RJ":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.093 15.802h-2.39L6.133 4.2h5.152c.886 0 1.576.091 2.07.273.493.182.891.516 1.194 1.001.304.486.456 1.074.456 1.765 0 .987-.296 1.8-.887 2.442-.59.64-1.485 1.038-2.683 1.19.306.275.594.636.863 1.085.533.907 1.126 2.19 1.78 3.846h-2.564c-.205-.654-.609-1.675-1.21-3.063-.328-.749-.676-1.253-1.045-1.511-.227-.153-.623-.23-1.187-.23h-.974l-1.005 4.804Zm1.37-6.545h1.266c1.282 0 2.133-.076 2.552-.23.42-.152.748-.392.985-.72.238-.327.356-.67.356-1.028 0-.423-.171-.74-.514-.95-.211-.127-.668-.19-1.37-.19H8.112l-.649 3.118ZM22.375 4.2h2.342l-1.464 7.028c-.39 1.862-.902 3.123-1.535 3.783-.633.66-1.607.989-2.92.989-1.114 0-1.947-.256-2.501-.768-.554-.511-.831-1.208-.831-2.09 0-.184.013-.39.04-.616l2.207-.238a4.432 4.432 0 0 0-.047.578c0 .37.105.652.316.847.212.195.536.293.974.293.612 0 1.042-.18 1.29-.539.184-.274.409-1.047.673-2.318L22.376 4.2Z" fill="#fff"></path></svg>';
    case "RX":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path d="M9.204 4.2 4.186 15.8H8.42l1.905-4.609 1.68-4.091h8.962l-1.21 2.788h-7.438a65.89 65.89 0 0 0 1.557 1.596 238.04 238.04 0 0 0 2.879 2.799c.493.472 1.03.977 1.613 1.517h10.777l1.926-1.484 2.129-1.64 1.389 3.124h6.228l-1.926-3.17-1.725-2.877L45.611 4.2h-6.43l-3.585 2.675-1.3-2.675h-6.071l3.204 5.575-8.447 5.575c-.418-.33-.915-.73-1.49-1.202-.575-.473-1.318-1.06-2.229-1.765h.874c.493 0 .892-.004 1.199-.011a8.64 8.64 0 0 0 .66-.034 1.68 1.68 0 0 0 .673-.157c.24-.232.424-.517.537-.832L26.232 4.2H9.204Z" fill="#fff"></path></svg>';
    case "SN":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M1.792 0h55.416C58.197 0 59 .806 59 1.8v16.4c0 .994-.801 1.8-1.792 1.8H1.792A1.797 1.797 0 0 1 0 18.2V1.8C0 .806.803 0 1.792 0Z" fill="#000"></path><path d="M12.798 7.659h-2.405c-.047-.564-.258-.994-.633-1.29-.369-.3-.888-.45-1.558-.45-.596 0-1.06.118-1.392.356-.327.232-.49.559-.49.98 0 .38.158.654.474.823.306.169 1.081.406 2.326.712 1.313.327 2.223.657 2.729.989.933.612 1.4 1.463 1.4 2.555 0 1.197-.47 2.14-1.408 2.832-.828.606-1.949.91-3.362.91-1.571 0-2.792-.36-3.662-1.076-.87-.718-1.321-1.738-1.353-3.062h2.515c.037.644.203 1.121.499 1.432.464.496 1.163.744 2.096.744.633 0 1.134-.124 1.503-.372.416-.285.625-.673.625-1.163s-.293-.849-.878-1.076c-.322-.126-1.081-.356-2.278-.688-.75-.205-1.335-.4-1.756-.585-.422-.185-.76-.39-1.013-.617-.59-.528-.886-1.255-.886-2.183 0-1.113.462-1.994 1.384-2.642.786-.554 1.807-.831 3.062-.831 1.102 0 2.025.219 2.768.657 1.07.627 1.635 1.642 1.693 3.045ZM24.513 4.234v11.565h-2.54l-4.84-7.879.031 7.879h-2.428V4.234h2.57l4.81 7.863-.032-7.863h2.429Z" fill="#FFDE15"></path></svg>';
    case "TGV":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23.193 6.66a7.168 7.168 0 0 0-.654-.349 6.826 6.826 0 0 0-.902-.307 5.88 5.88 0 0 0-1.573-.174c-1.37 0-2.49.454-3.361 1.362-.872.908-1.308 2.065-1.308 3.472 0 1.096.309 1.955.927 2.575.618.62 1.479.93 2.583.93.302.014.605-.026.894-.116l.645-3.074h-2.45l.38-1.827h4.686l-1.324 6.33c-.221.077-.42.14-.596.19-.177.05-.475.117-.894.2a8.964 8.964 0 0 1-1.672.124c-1.822 0-3.21-.445-4.165-1.337-.954-.891-1.432-2.179-1.432-3.862 0-2.082.632-3.735 1.896-4.96 1.264-1.223 2.967-1.835 5.108-1.835.655-.003 1.308.052 1.953.166a12.87 12.87 0 0 1 1.838.482l-.58 2.01ZM4.583 4.201h8.924l-.38 1.828H9.864l-2.103 9.768H5.345L7.447 6.03H4.186L4.583 4.2Zm23.13 0h-2.318l1.523 11.596h2.765L36.14 4.201h-2.517l-4.834 9.021-1.076-9.02Z" fill="#fff"></path></svg>';
    case "VAE":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#EB0000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.023 4.2h2.623l-3.838 11.6H7.942L4.186 4.2h2.623l2.574 8.156h.033L12.023 4.2Zm4.094 11.6h-2.575L17.93 4.2h2.607l4.323 11.6h-2.64l-.873-2.583h-4.324l-.906 2.583Zm3.076-8.74h.032l1.458 4.256h-2.996l1.506-4.257Zm15.331 8.74h-8.776V4.2h8.647v2.144H28.29V8.83h5.603v1.982H28.29v2.843h6.233V15.8Z" fill="#fff"></path></svg>';
    case "EV":
      return '<svg class="color-immutable" width="59" height="20" viewBox="0 0 59 20" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h55a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" fill="#F27E00"></path><path d="M14.153 4.17v2.142H7.98v2.476h5.657v1.991H7.98v2.849h6.284v2.142H5.45V4.17h8.704ZM25.311 4.17l-3.856 11.6h-2.88l-3.8-11.6h2.65l2.61 8.688 2.65-8.688h2.626Z" fill="#000"></path></svg>';
    default:
      return "";
  }
}

function getCategoryImage(category) {
  if (category === "S") {
    const serviceClass = "s-service";
    return `<span class="service ${serviceClass}">‏ ‎${category}</span>`;
  } else {
    const imageSource = getImageSource(category);
    if (imageSource) {
      return imageSource;
    } else {
      const serviceClass = "other-services";
      return `<span class="service ${serviceClass}">‏ ‎${category}</span>`;
    }
  }
}

function getServiceName(category) {
  return `<span class="${
    category === "S" ? "s-service" : "other-services"
  }">${category}</span>`;
}

function displayTimetable(stationboard) {
  const timetableContainer = document.getElementById("timetable");
  timetableContainer.innerHTML = "";

  const imageRow = createRow("svg-img-row");
  imageRow.innerHTML = '<img class="svg-img" src="sbb(2).svg" alt="Buchs SG">';
  timetableContainer.appendChild(imageRow);

  const dividerRow = createRow("divider");
  timetableContainer.appendChild(dividerRow);

  const headerRow = createRow("departure");
  headerRow.innerHTML =
    '<div class="service-header">‏ ‎Service</div>' +
    '<div class="time header">Time</div>' +
    '<div class="destination header">Destination</div>' +
    '<div class="platform header">Platform</div>';
  timetableContainer.appendChild(headerRow);

  stationboard.forEach((departure) => {
    const { category, to, stopovers } = departure;
    const departureTime = formatTime(departure.stop.departureTimestamp);
    const platform = departure.stop.platform;
    const departureElement = document.createElement("div");
    departureElement.classList.add("departure");
    const serviceRow = createRow("service");
    serviceRow.innerHTML = getCategoryImage(category);
    const timeRow = createRow("time", departureTime);
    const destinationRow = createRow("destination", to);
    const platformRow = createRow("platform", `${platform}`);
    departureElement.appendChild(serviceRow);
    departureElement.appendChild(timeRow);
    departureElement.appendChild(destinationRow);
    departureElement.appendChild(platformRow);
    timetableContainer.appendChild(departureElement);
  });
}

function createRow(className, content) {
  const rowElement = document.createElement("div");
  rowElement.classList.add(className);
  rowElement.innerHTML = content || "";
  return rowElement;
}

console.log("Page loaded. Fetching timetable...");
fetchTimetable();
