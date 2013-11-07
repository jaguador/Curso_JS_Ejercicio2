/*******************
* Ejercicio 2
* Julio Aguado Robles
* Alumno: al10788
********************/

var tablero;
var turnos = ["rojo", "azul"];

// Clase Tablero
function Tablero(filas, columnas) {
	this.tablero = null;		// array del tablero
	this.filas = filas;
	this.columnas = columnas;
	this.turno = turnos[0];	// Turno actual (siempre comienza rojo)
	this.jugadas = 0;
	this.literalPuntuacion = null;	// Literal de la puntuacion
	this.dibujaTablero = dibujaTablero;
	this.chkGanador = chkGanador;
	this.mostrarGanador = mostrarGanador;
	
	// Inicializar el array a vacio
	this.tablero = new Array(this.filas);
	for (var i=0; i<filas; i++) {
		this.tablero[i] = new Array(this.columnas);
		for (var j=0; j<columnas; j++)
			this.tablero[i][j] = "";
	}				
}


function mostrarGanador(posicion_fila, posicion_columna, color, direccion_fila, direccion_columna) {
	var velocidad = 500;
	function blink(selector, vel){
		$(selector).animate({opacity:0}, 50, "linear", function(){
			$(this).delay(vel);
			$(this).animate({opacity:1}, 50, function(){
				blink(this);
			});
			$(this).delay(vel);
		});
	}
	var indice_fila = posicion_fila;
	var indice_columna = posicion_columna;
	for (var i=0; i<4; i++) {
		// blink("#div_"+indice_fila+"_"+indice_columna, velocidad);
		$("#div_"+indice_fila+"_"+indice_columna).append('<b>X</b>');
		indice_fila += direccion_fila;
		indice_columna += direccion_columna;
	}
}


function chkGanador(posicion_fila, posicion_columna, color) {
	var contador, pos_col, pos_fil;

	// Mirar a la derecha
	contador = 0;
	pos_col = posicion_columna;
	while (pos_col < this.columnas && this.tablero[posicion_fila][pos_col] == color ) {
		contador++;
		pos_col++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 0, 1);

	// Mirar a la izquierda
	contador = 0;
	pos_col = posicion_columna;
	while (pos_col >= 0 && this.tablero[posicion_fila][pos_col] == color ) {
		contador++;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 0, -1);

	// Mirar abajo
	contador = 0;
	pos_fil = posicion_fila
	while (pos_fil < this.filas && this.tablero[pos_fil][posicion_columna] == color ) {
		contador++;
		pos_fil++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, 0);
		
	// Mirar abajo-derecha
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil < this.filas && pos_col < this.columnas && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil++;
		pos_col++;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, 1);

	// Mirar abajo-izquierda
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil < this.filas && pos_col >= 0 && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil++;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, 1, -1);	

	// Mirar arriba-izquierda
	contador = 0;
	pos_fil = posicion_fila
	pos_col = posicion_columna
	while (pos_fil >= 0 && pos_col >= 0 && this.tablero[pos_fil][pos_col] == color ) {
		contador++;
		pos_fil--;
		pos_col--;
	}
	if (contador == 4) 
		this.mostrarGanador(posicion_fila, posicion_columna, color, -1, -1);			
}



function dibujaTablero() {
	// Crear la tabla con el tablero de juego
	var html = "<table id='tblTablero' cellpadding=0 cellspacing=0><tr><td colspan='"+this.columnas+1+"' align='center'><div class='turno_rojo' id='turno_rojo'><b>TURNO ROJO</b></div><div class='turno_azul' id='turno_azul' style='opacity:0'><b>TURNO AZUL</b></div></td></tr><tr>";
	// Botones para colocar ficha
	for (var i=0; i<this.columnas; i++)
		html += "<td><input type='button' value='Ficha' id='btnCol_"+i+"'><script type=\"text/javascript\">$(\"#btnCol_"+i+"\").click(colocarFicha);</script></td>";
	html += "<td id='celda_blanco'><div>&nbsp;</div></td></tr>";
	for (var i=0; i<this.filas; i++) {
		html += "<tr>";
		for (var j=0; j<this.columnas; j++)
//			html+= "<td id='celda_"+i+"_"+j+"' class='casilla'><div class='wrapper'><div class='blanco'>&nbsp;</div><div id='div_"+i+"_"+j+"' >&nbsp;</div></div></td>";
			html+= "<td id='celda_"+i+"_"+j+"' class='casilla'><div id='div_"+i+"_"+j+"' >&nbsp;</div></td>";
		html += "<td id='celda_blanco'><div>&nbsp;</div></td><tr>";
	}
	html+= "</tr>";
	html+= "</table>";
	$("#panelJuego").html(html);
	
}


function colocarFicha() {
	var velocidad = 200;
	var columna = this.id.split('_')[1];
	var i = 0;
	while (i<(tablero.filas) && tablero.tablero[i][columna] == "") {
		$("#div_"+i+"_"+columna).hide();
		$("#div_"+i+"_"+columna).removeClass(turnos[0]);		
		$("#div_"+i+"_"+columna).removeClass(turnos[1]);		
		$("#div_"+i+"_"+columna).addClass(tablero.turno);		
		if (i<(tablero.filas-1) && tablero.tablero[i+1][columna] == "") {
			$("#div_"+i+"_"+columna).delay(velocidad*i).fadeIn(velocidad).fadeOut(0);
		} 
		else
			$("#div_"+i+"_"+columna).delay(velocidad*i).fadeIn(velocidad);
		i++;
	}
	if (i > 0) {
		tablero.tablero[i-1][columna] = tablero.turno;
		tablero.jugadas++;
		tablero.chkGanador(i-1, parseInt(columna), tablero.turno);
		$("#turno_"+tablero.turno).animate({opacity:0}, function(){ $("#turno_"+turnos[(tablero.jugadas)%turnos.length]).animate({opacity:1})});
		tablero.turno = turnos[tablero.jugadas%turnos.length];
	}
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


