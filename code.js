if (navigator.serviceWorker) {
  navigator.serviceWorker.register("./sw.js");
}

const textCss = document.querySelector("#css");
textCss.value = window.localStorage.getItem("css");
const textJavascript = document.querySelector("#javascript");
textJavascript.value = window.localStorage.getItem("js");
const textHtml = document.querySelector("#html");
textHtml.value = window.localStorage.getItem("html");
const styleElement = document.querySelector("#style");

const main = document.querySelector("main");

//reflejar los cambios al cargar la pagina
window.addEventListener("load", () => {
  styleElement.textContent = window.localStorage.getItem("css");

  main.innerHTML = window.localStorage.getItem("html");

  eval(window.localStorage.getItem("js"));
});

textHtml.addEventListener("keyup", (e) => {
  ejecutarHtml();
});

const ejecutarHtml = () => {
  window.localStorage.setItem("html", textHtml.value);

  main.innerHTML = window.localStorage.getItem("html");
};

textCss.addEventListener("keyup", (e) => {
  ejecutarCss();
});

const ejecutarCss = () => {
  let resultado = textCss.value.replace("body", "main");

  window.localStorage.setItem("css", resultado);

  styleElement.textContent = window.localStorage.getItem("css");
};

textJavascript.addEventListener("keyup", (e) => {
  ejecutarJavascript(e);
});

const ejecutarJavascript = (e) => {
  try {
    if (e.key === "Shift") {
      e.preventDefault();
    } else {
      window.localStorage.setItem("js", textJavascript.value);
      eval(window.localStorage.getItem("js"));
    }
  } catch (error) {
    // console.error(error)
  }
};

// AL REALIZAR LA ACCION DE PEGAR HACER LO SIGUIENTE
textCss.addEventListener("paste", () => {
  ejecutarCss();
});
textHtml.addEventListener("paste", () => {
  ejecutarHtml();
});
textJavascript.addEventListener("paste", () => {
  ejecutarJavascript();
});

let touchActual = 0;
let ubicacion = "html";

window.addEventListener("touchstart", (e) => {
  touchActual = e.touches[0].clientX;
  e.preventDefault();
}, false);

window.addEventListener("touchmove", (e) => {
  let desplazamiento = e.touches[0].clientX - touchActual;

  if(Math.abs(desplazamiento) > 100){
    if(desplazamiento < 0){
      // Desplazamiento a la derecha
      if(ubicacion === "js"){
        segunUbicacion("css");
        ubicacion = "css";
      } else if(ubicacion === "css"){
        segunUbicacion("html");
        ubicacion = "html";
      }
    } else {
      // Desplazamiento a la izquierda
      if(ubicacion === "html"){
        segunUbicacion("css");
        ubicacion = "css";
      } else if(ubicacion === "css"){
        segunUbicacion("js");
        ubicacion = "js";
      }
    }

    // Actualizar la posición actual del toque
    touchActual = e.touches[0].clientX;
  }
}, false);

const opcionCss = document.querySelector("#opcionCss");
opcionCss.addEventListener("click", () => {
  segunUbicacion("css");
});

const opcionJs = document.querySelector("#opcionJs");
opcionJs.addEventListener("click", () => {
  segunUbicacion("js");
});

const opcionHtml = document.querySelector("#opcionHtml");
opcionHtml.addEventListener("click", () => {
  segunUbicacion("html");
});

const segunUbicacion = (ubicacion) => {
  switch (ubicacion) {
    case "html":
      textJavascript.style.display = "none";
      textCss.style.display = "none";
      textHtml.style.display = "flex";

      opcionCss.style.backgroundColor = "#ffffff";
      opcionJs.style.backgroundColor = "#ffffff";
      opcionHtml.style.backgroundColor = "#ffd5ad";

      break;
    case "css":
      textJavascript.style.display = "none";
      textCss.style.display = "flex";
      textHtml.style.display = "none";

      opcionCss.style.backgroundColor = "#bcffff";
      opcionJs.style.backgroundColor = "#ffffff";
      opcionHtml.style.backgroundColor = "#ffffff";
      break;

    case "js":
      textJavascript.style.display = "flex";
      textCss.style.display = "none";
      textHtml.style.display = "none";

      opcionCss.style.backgroundColor = "#ffffff";
      opcionJs.style.backgroundColor = "#fcf0ac";
      opcionHtml.style.backgroundColor = "#ffffff";
      break;
  }
};

$("#aumentar").click(() => {
  const tamaño = Number($("*").css("font-size").split("px")[0]);
  $("*").css("font-size", `${tamaño + 3}px`);
});

$("#reducir").click(() => {
  const tamaño = Number($("*").css("font-size").split("px")[0]);
  $("*").css("font-size", `${tamaño - 3}px`);
});
