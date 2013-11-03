/*******************
* Ejercicio 2
* Julio Aguado Robles
* Alumno: al10788
********************/


// Clase Tablero
function Tablero(filas, columnas) {
	this.tablero = null;		// array del tablero
	this.filas = filas;
	this.columnas = columnas;
	this.turno = null;	// Turno actual 
	this.literalPuntuacion = null;	// Literal de la puntuacion
	this.dibujaTablero = dibujaTablero;
	
	// Inicializar el array a vacio
	this.tablero = new Array(this.filas);
	for (var i=0; i<filas; i++) {
		this.tablero[i] = new Array(this.columnas);
		for (var j=0; j<columnas; j++)
			this.tablero[i][j] = "";
	}				
}

function dibujaTablero() {
	// Crear la tabla con el tablero de juego
	var html = "<table id='tblTablero' cellpadding=0 cellspacing=0><tr>";
	// Botones para colocar ficha
	for (var i=0; i<this.columnas; i++)
		html += "<td><input type='button' value='Ficha' id='btnCol"+i+"'></td>";
	html += "</tr>";
	for (var i=0; i<this.filas; i++) {
		html += "<tr>";
		for (var j=0; j<this.columnas; j++)
			html+= "<td id='celda_'"+i+"_"+j+" class='casilla'>&nbsp;</td>";
		html += "<tr>";
	}
	html+= "</tr>";
	html+= "</table>";
	$("#panelJuego").html(html);
}


function iniciaJuego() {
	// Comprobar que filas y columnas es numerico
	if ($.isNumeric($("#fldFilas").val()) && $.isNumeric($("#fldColumnas").val())) {
		// Crear y dibujar el tablero
		tablero = new Tablero($("#fldFilas").val(),$("#fldColumnas").val());
		tablero.dibujaTablero();
	}
	else
		alert('Debe introducir valores numéricos para filas y columnas');
}

// Funcion principal llamada desde el origen HTML
function mostrarResultado(valoracion, idDivHTML, idDivJSON) {
 // Se crea un Array el listado de webs (separadas por ;)
 var listado = datos.split(';');  
 var webs = new Array;
 var valorEntero = parseInt(valoracion);
 var ficheroHTML = "";
 var ficheroJSON = "";
 var cont = 0;	// Contador de webs leidas
 
 // Recorrer el array para crear los objetos web
 for (var i in listado) {
	// Tomar la url y puntuacion separados por #
	var registro = listado[i].split('#');
	// Si la valoracion es la que se busca o se indica que se busquen todas
	if (parseInt(registro[1]) == valorEntero || valorEntero === 0) {
		webs[cont] = new Web(registro[0], parseInt(registro[1]));
		webs[cont].setLiteralPuntuacion(parseInt(registro[1]));
		cont++;
	}
 }

 // Si no se han encontrado con los criterios, se indica
 if (cont == 0) {
	ficheroHTML = "(No se han encontrado webs con el criterio seleccionado)";
	ficheroJSON = "[]";
 } else {
	 // Recorrer las webs generadas para obtener el fichero html
	 ficheroHTML = "<ul>";
	 for (var i in webs) {
		ficheroHTML += "<li><a href='"+webs[i].url+"' target='_blank'>"+webs[i].url+"</a></li>";
	 }
	 ficheroHTML += "</ul>";
	 ficheroJSON = "[";
	 // Recorrer las webs generadas para obtener el fichero JSON
	 for (var i in webs) {
		ficheroJSON += " {url: '"+webs[i].url+"', puntuacion: "+webs[i].puntuacion+", literalPuntuacion: '"+webs[i].literalPuntuacion+"'},";
	 }
	 ficheroJSON = ficheroJSON.substring(0, ficheroJSON.length -1);  // Se quita la última ',
	 ficheroJSON += "]";   // Se cierra el vector de objetos JSON
 }
 // Mostrar el resultado final
 document.getElementById(idDivHTML).innerHTML  = ficheroHTML;
 document.getElementById(idDivJSON).innerHTML  = ficheroJSON; 
}

