cargarSemestres();
var semestres = "";

function comprobarCredenciales() {
	var datosValidos = "true";
	var usuarios = "";
	var autenticacion = false;
	var nombre = $("#usuario").val();
	var contra = $("#contra").val();
	datosValidos = validarDatos("login");
	if(datosValidos){
		$.getJSON("https://api.myjson.com/bins/185j3q", function(result){
			$.each(result, function(i, usuario){
				autenticacion = usuario.nombre == nombre && usuario.contra == contra;
				if(i == result.length-1 && !autenticacion)
					alert("Usuario o Contraseña incorrectos.");
				else {
					ocultar("login");
					mostrar("materias");
					cargarSemestres();
					return false;
				}
			});
		});
	}
}

function validarDatos() {
	var usr = "";
	var pass = "";
	var usr = $("#usuario").val();
	var pass = $("#contra").val();
	if(usr.length < 3 || pass.length < 3) {
		alert("Escribir almenos 3 caracteres en cada campo.");
		return false;
	}
	return true;
}

function cargarSemestres() {
	var usuario = "adminadmin";
	usuario = $("#usuario").val() + $("#contra").val();
	$.getJSON("https://api.myjson.com/bins/ctwyu", function(result) {
		$.each(result, function(i, info) {
			if(info.usuario == usuario) {
				semestres = info.semestres;
				if(semestres.length) {
					semestres.forEach(function(semestre){
						$("#semestre").append("<option value ='" + semestre + "'>" + semestre + "</option>");
					});
					return false;
				}
				else
					alert("No se han llevado semestres en la facultad.");
			}
		});
	});
}

function cargarMaterias(control) {
	$('#tablaMaterias').empty();
	$("#tablaMaterias").append("<tr><th>Materia</th><th>Créditos</th><th>Horario</th><th>Docente</th></tr>");
	if(control.value != -1) {
		var materias = "";
		var semestre = "";
		semestre = control.value;
		$.getJSON("https://api.myjson.com/bins/rf906", function(result) {
			$.each(result, function(i, info) {
				if(info.semestre == semestre) {
					materias = info.materias;
					materias.forEach(function(materia,i) {
						$("#tablaMaterias").append("<tr id=" + i + "></tr>");
						
						$("#" + i).append("<td>" + materia.nombre + "</td>");
						$("#" + i).append("<td>" + materia.creditos + "</td>");
						$("#" + i).append("<td>" + materia.horario + "</td>");
						$("#" + i).append("<td>" + materia.docente + "</td>");
					});
					return 0;
				}
			});
		});
	}
}

function ocultar(cosa){
	$("." + cosa).hide();
}

function mostrar(cosa){
	$("." + cosa).show();
}

function cerrarSesion() {
	$('#semestre').empty();
	$("#semestre").append("<option value ='0'>Seleccionar...</option>");
	$('#tablaMaterias').empty();
	$("#tablaMaterias").append("<tr><th>Materia</th><th>Créditos</th><th>Horario</th><th>Docente</th></tr>");
	ocultar('materias');
	mostrar('login');
	$("#usuario").val("");
	$("#contra").val("");
	$('#semestre').val("");
}