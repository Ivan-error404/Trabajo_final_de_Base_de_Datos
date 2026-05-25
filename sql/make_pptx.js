const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Base de Datos Cine";

// Color palette: dark cinema theme
const C = {
  bg:       "0D0D1A",   // deep night
  bgLight:  "14142A",   // slightly lighter
  panel:    "1E1E3A",   // card bg
  panelB:   "252545",   // card bg B
  gold:     "F5A623",   // accent gold
  red:      "E8384D",   // cinema red
  blue:     "4A90D9",   // info blue
  teal:     "00C2B2",   // teal
  white:    "FFFFFF",
  offWhite: "E8E8F0",
  grey:     "8888AA",
  dark:     "0A0A16",
};

// ─────────────────────────────────────────────
// SLIDE 1 — PORTADA
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top decorative bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });

  // Large film-strip blocks on the left
  const stripeColors = [C.red, C.gold, C.teal, C.blue, C.red, C.gold];
  stripeColors.forEach((col, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0.08 + i * 0.9, w: 0.35, h: 0.72,
      fill: { color: col, transparency: 30 }, line: { color: col, transparency: 30 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.035, y: 0.08 + i * 0.9 + 0.09, w: 0.28, h: 0.54,
      fill: { color: C.dark }, line: { color: C.dark }
    });
  });

  // Right decorative strip
  s.addShape(pres.shapes.RECTANGLE, { x: 9.65, y: 0, w: 0.35, h: 5.625, fill: { color: C.panel }, line: { color: C.panel } });

  // Main title area
  s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.0, w: 8.6, h: 1.7, fill: { color: C.panel }, line: { color: C.red, pt: 2 } });
  s.addText("BASE DE DATOS", {
    x: 0.7, y: 1.05, w: 8.6, h: 0.75,
    fontSize: 42, bold: true, color: C.white, align: "center",
    fontFace: "Georgia", charSpacing: 5, margin: 0
  });
  s.addText("CINE MULTIPLEX", {
    x: 0.7, y: 1.75, w: 8.6, h: 0.7,
    fontSize: 32, bold: true, color: C.gold, align: "center",
    fontFace: "Georgia", charSpacing: 4, margin: 0
  });

  // Subtitle
  s.addText("Proyecto de Base de Datos Completa", {
    x: 1, y: 2.95, w: 8, h: 0.45,
    fontSize: 17, color: C.offWhite, align: "center", italic: true, fontFace: "Calibri"
  });

  // Info row
  const infos = ["Módulo: Bases de Datos", "Empresa: Cine Multiplex S.A.", "MySQL 8.0"];
  infos.forEach((txt, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.65 + i * 3.0, y: 3.6, w: 2.7, h: 0.55,
      fill: { color: C.panelB }, line: { color: C.teal, pt: 1 }
    });
    s.addText(txt, {
      x: 0.65 + i * 3.0, y: 3.6, w: 2.7, h: 0.55,
      fontSize: 12, color: C.teal, align: "center", bold: true, fontFace: "Calibri", margin: 0
    });
  });

  // Bottom tag
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
}

// ─────────────────────────────────────────────
// SLIDE 2 — ÍNDICE
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("ÍNDICE DEL PROYECTO", {
    x: 0.5, y: 0.2, w: 9, h: 0.6, fontSize: 28, bold: true,
    color: C.white, fontFace: "Georgia", charSpacing: 3
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.82, w: 0.06, h: 3.8, fill: { color: C.red }, line: { color: C.red } });

  const items = [
    ["01", "Tipo de Empresa y Necesidades",     C.gold],
    ["02", "Requisitos del Sistema",             C.teal],
    ["03", "Diagrama Entidad / Relación",        C.blue],
    ["04", "Modelo Relacional",                  C.red],
    ["05", "Implementación en MySQL",            C.gold],
    ["06", "Funcionalidades Extra",              C.teal],
    ["07", "Consultas y Resultados",             C.blue],
  ];

  items.forEach(([num, label, col], i) => {
    const y = 0.88 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: y, w: 0.5, h: 0.38,
      fill: { color: col }, line: { color: col }
    });
    s.addText(num, { x: 0.7, y: y, w: 0.5, h: 0.38, fontSize: 14, bold: true, color: C.dark, align: "center", margin: 0 });
    s.addText(label, { x: 1.35, y: y + 0.03, w: 7.5, h: 0.35, fontSize: 16, color: C.offWhite, fontFace: "Calibri" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
}

// ─────────────────────────────────────────────
// SLIDE 3 — EMPRESA Y NECESIDADES
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  s.addText("01  TIPO DE EMPRESA Y NECESIDADES", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.55,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  // Left col — empresa
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.85, w: 4.3, h: 1.55, fill: { color: C.panel }, line: { color: C.gold, pt: 1 } });
  s.addText("Empresa", { x: 0.35, y: 0.88, w: 4.2, h: 0.38, fontSize: 16, bold: true, color: C.gold, fontFace: "Calibri" });
  s.addText([
    { text: "Nombre: ", options: { bold: true, color: C.teal } },
    { text: "Cine Multiplex S.A.\n", options: { color: C.offWhite } },
    { text: "Sector: ", options: { bold: true, color: C.teal } },
    { text: "Entretenimiento / Exhibición cinematográfica\n", options: { color: C.offWhite } },
    { text: "Tamaño: ", options: { bold: true, color: C.teal } },
    { text: "Grande — 8 departamentos, múltiples salas", options: { color: C.offWhite } },
  ], { x: 0.38, y: 1.28, w: 4.1, h: 1.05, fontSize: 12, fontFace: "Calibri", lineSpacingMultiple: 1.3 });

  // Right col — necesidades cards
  const needs = [
    ["Gestión de Salas",    "Control de capacidad,\nasientos y horarios",        C.red],
    ["Ventas & Entradas",   "Registro de tickets,\nprecios y transacciones",      C.teal],
    ["Clientes & Puntos",   "Fidelización con sistema\nde puntos por compra",      C.blue],
    ["RRHH",               "Control de empleados\npor departamento",             C.gold],
  ];
  needs.forEach(([title, desc, col], i) => {
    const col2 = i < 2 ? 5.0 : 7.7;
    const row  = i % 2;
    const y    = 0.85 + row * 1.85;
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 2.4, h: 1.65, fill: { color: C.panel }, line: { color: col, pt: 2 } });
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 2.4, h: 0.38, fill: { color: col }, line: { color: col } });
    s.addText(title, { x: col2, y, w: 2.4, h: 0.38, fontSize: 12, bold: true, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText(desc, { x: col2 + 0.1, y: y + 0.42, w: 2.2, h: 1.1, fontSize: 11, color: C.offWhite, fontFace: "Calibri", lineSpacingMultiple: 1.3 });
  });

  // Bottom — departamentos badges
  s.addText("Departamentos:", { x: 0.3, y: 4.62, w: 2.2, h: 0.3, fontSize: 13, bold: true, color: C.teal, fontFace: "Calibri" });
  const depts = ["Ventas","RRHH","Mantenimiento","Marketing","Programación","Finanzas","Atención al Cliente","Seguridad"];
  const deptColors = [C.red, C.gold, C.blue, C.teal, C.red, C.gold, C.blue, C.teal];
  depts.forEach((d, i) => {
    const x2 = 0.3 + i * 1.2;
    if (x2 > 9.2) return;
    s.addShape(pres.shapes.RECTANGLE, { x: x2, y: 4.97, w: 1.1, h: 0.35, fill: { color: deptColors[i], transparency: 20 }, line: { color: deptColors[i] } });
    s.addText(d, { x: x2, y: 4.97, w: 1.1, h: 0.35, fontSize: 9, bold: true, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
}

// ─────────────────────────────────────────────
// SLIDE 4 — REQUISITOS
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("02  REQUISITOS DEL SISTEMA", {
    x: 0.4, y: 0.15, w: 9.2, h: 0.55,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  const reqs = [
    { num: "RF-01", cat: "Funcional",      txt: "Gestionar películas: título, duración, clasificación y género",     col: C.red },
    { num: "RF-02", cat: "Funcional",      txt: "Registrar salas con capacidad y asientos numerados por fila",        col: C.red },
    { num: "RF-03", cat: "Funcional",      txt: "Programar sesiones (fecha, hora, película y sala asignada)",         col: C.red },
    { num: "RF-04", cat: "Funcional",      txt: "Vender entradas verificando disponibilidad del asiento",             col: C.red },
    { num: "RF-05", cat: "Funcional",      txt: "Acumular puntos al cliente automáticamente por cada compra",         col: C.red },
    { num: "RNF-01", cat: "No Funcional",  txt: "Garantizar integridad: claves foráneas y restricción UNIQUE",        col: C.blue },
    { num: "RNF-02", cat: "No Funcional",  txt: "Seguridad: roles diferenciados (admin, vendedor, consultor)",        col: C.blue },
    { num: "RNF-03", cat: "No Funcional",  txt: "Rendimiento: vistas pre-calculadas para consultas frecuentes",       col: C.blue },
  ];

  reqs.forEach((r, i) => {
    const col2 = i < 4 ? 0.3 : 5.15;
    const row  = i % 4;
    const y    = 0.85 + row * 1.15;
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 4.55, h: 1.0, fill: { color: C.panel }, line: { color: r.col, pt: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 0.75, h: 1.0, fill: { color: r.col, transparency: 15 }, line: { color: r.col } });
    s.addText(r.num, { x: col2, y: y + 0.05, w: 0.75, h: 0.45, fontSize: 10, bold: true, color: C.white, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText(r.cat, { x: col2, y: y + 0.52, w: 0.75, h: 0.38, fontSize: 8, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText(r.txt, { x: col2 + 0.82, y: y + 0.12, w: 3.6, h: 0.75, fontSize: 12, color: C.offWhite, fontFace: "Calibri", lineSpacingMultiple: 1.25 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
}

// ─────────────────────────────────────────────
// SLIDE 5 — DIAGRAMA E/R (visual)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.blue }, line: { color: C.blue } });
  s.addText("03  DIAGRAMA ENTIDAD / RELACIÓN", {
    x: 0.4, y: 0.12, w: 9.2, h: 0.52,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  // Helper: draw entity box
  function entity(sx, sy, sw, sh, name, fields, col) {
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: sy, w: sw, h: sh, fill: { color: C.panel }, line: { color: col, pt: 2 } });
    s.addShape(pres.shapes.RECTANGLE, { x: sx, y: sy, w: sw, h: 0.32, fill: { color: col }, line: { color: col } });
    s.addText(name, { x: sx, y: sy, w: sw, h: 0.32, fontSize: 11, bold: true, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    const fLines = fields.map(f => ({ text: f, options: { breakLine: true, color: f.startsWith("PK") ? C.gold : f.startsWith("FK") ? C.teal : C.offWhite, fontSize: 9 } }));
    if (fLines.length) fLines[fLines.length-1].options.breakLine = false;
    s.addText(fLines, { x: sx + 0.05, y: sy + 0.34, w: sw - 0.1, h: sh - 0.38, fontFace: "Calibri", fontSize: 9, lineSpacingMultiple: 1.2 });
  }

  // Helper: draw a relationship line
  function rel(x1, y1, x2, y2, label) {
    s.addShape(pres.shapes.LINE, { x: x1, y: y1, w: x2-x1, h: y2-y1, line: { color: C.grey, pt: 1, dashType: "dash" } });
    if (label) s.addText(label, { x: (x1+x2)/2 - 0.2, y: (y1+y2)/2 - 0.12, w: 0.4, h: 0.2, fontSize: 7, color: C.grey, align: "center" });
  }

  // Layout (x, y, w, h)
  // row 1
  entity(0.1,  0.75, 2.1, 1.55, "DEPARTAMENTO",  ["PK id_departamento","   nombre"],                              C.gold);
  entity(2.55, 0.75, 2.2, 1.65, "EMPLEADO",       ["PK id_empleado","   nombre","   apellido","FK id_departamento"],C.teal);
  entity(5.15, 0.75, 2.05,1.05, "PROMOCION",      ["PK id_promocion","   descripcion","   descuento"],             C.blue);

  // row 2
  entity(0.1,  2.7,  2.1, 1.55, "CLIENTE",        ["PK id_cliente","   nombre, email","   telefono, puntos"],       C.red);
  entity(2.55, 2.7,  2.2, 1.55, "VENTA",          ["PK id_venta","   fecha, total","FK id_cliente"],                C.gold);
  entity(5.15, 2.7,  2.05,1.55, "ENTRADA",        ["PK id_entrada","FK id_venta","FK id_sesion","FK id_asiento"],   C.red);

  // row 3
  entity(0.1,  4.55, 2.1, 0.85, "PELICULA",       ["PK id_pelicula","   titulo, genero"],                           C.teal);
  entity(2.55, 4.55, 2.2, 0.85, "SESION",         ["PK id_sesion","   fecha, hora","FK id_pelicula, FK id_sala"],   C.blue);
  entity(5.15, 4.55, 2.05,0.85, "SALA",           ["PK id_sala","   nombre, capacidad"],                            C.gold);
  entity(7.45, 4.55, 2.05,0.85, "ASIENTO",        ["PK id_asiento","   fila, numero","FK id_sala"],                 C.teal);

  // Relation lines
  rel(2.2,  1.52, 2.55, 1.62, "1:N");  // DPTO -> EMP
  rel(2.2,  3.47, 2.55, 3.47, "1:N");  // CLIENTE -> VENTA
  rel(4.75, 3.47, 5.15, 3.47, "1:N");  // VENTA -> ENTRADA
  rel(3.65, 4.25, 3.65, 4.55, "1:N");  // SESION -> ENTRADA (via x mid)
  rel(6.17, 4.25, 6.17, 4.55, "1:N");  // ASIENTO -> ENTRADA
  rel(1.15, 4.25, 1.15, 4.55, "1:N");  // PELICULA (connected via sesion)
  rel(2.2,  5.0,  2.55, 5.0,  "N:1");  // PELICULA <- SESION
  rel(4.75, 5.0,  5.15, 5.0,  "N:1");  // SESION -> SALA
  rel(7.2,  5.0,  7.45, 5.0,  "N:1");  // ASIENTO -> SALA

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.blue }, line: { color: C.blue } });
}

// ─────────────────────────────────────────────
// SLIDE 6 — MODELO RELACIONAL
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  s.addText("04  MODELO RELACIONAL", {
    x: 0.4, y: 0.12, w: 9.2, h: 0.52,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  const tables = [
    { name: "departamento", pk: "id_departamento", fields: "nombre",                                              col: C.gold  },
    { name: "empleado",     pk: "id_empleado",     fields: "nombre, apellido, puesto,  FK→departamento",          col: C.teal  },
    { name: "cliente",      pk: "id_cliente",      fields: "nombre, email, telefono, puntos",                     col: C.red   },
    { name: "pelicula",     pk: "id_pelicula",     fields: "titulo, duracion, clasificacion, genero",             col: C.teal  },
    { name: "sala",         pk: "id_sala",         fields: "nombre, capacidad",                                    col: C.gold  },
    { name: "asiento",      pk: "id_asiento",      fields: "fila, numero,  FK→sala",                              col: C.blue  },
    { name: "sesion",       pk: "id_sesion",       fields: "fecha, hora,  FK→pelicula,  FK→sala",                  col: C.blue  },
    { name: "venta",        pk: "id_venta",        fields: "fecha, total,  FK→cliente",                           col: C.red   },
    { name: "entrada",      pk: "id_entrada",      fields: "precio,  FK→venta,  FK→sesion,  FK→asiento",          col: C.gold  },
    { name: "promocion",    pk: "id_promocion",    fields: "descripcion, descuento",                               col: C.teal  },
  ];

  tables.forEach((t, i) => {
    const col2 = i < 5 ? 0.2 : 5.1;
    const row  = i % 5;
    const y    = 0.75 + row * 0.93;
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 4.7, h: 0.78, fill: { color: C.panel }, line: { color: t.col, pt: 1 } });
    // Table name badge
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 1.3, h: 0.78, fill: { color: t.col, transparency: 10 }, line: { color: t.col } });
    s.addText(t.name, { x: col2, y: y+0.05, w: 1.3, h: 0.42, fontSize: 10, bold: true, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText("PK: " + t.pk, { x: col2, y: y+0.47, w: 1.3, h: 0.25, fontSize: 8, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    s.addText(t.fields, { x: col2 + 1.38, y: y+0.1, w: 3.2, h: 0.58, fontSize: 11, color: C.offWhite, fontFace: "Calibri", lineSpacingMultiple: 1.2 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
}

// ─────────────────────────────────────────────
// SLIDE 7 — IMPLEMENTACIÓN MYSQL (creación)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("05  IMPLEMENTACIÓN EN MySQL — Tablas", {
    x: 0.4, y: 0.12, w: 9.2, h: 0.52,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  // Code panel left
  s.addShape(pres.shapes.RECTANGLE, { x: 0.2, y: 0.75, w: 5.5, h: 4.65, fill: { color: C.dark }, line: { color: C.grey, pt: 1 } });
  s.addText("MySQL", { x: 0.2, y: 0.75, w: 1.1, h: 0.3, fontSize: 9, color: C.grey, fontFace: "Consolas" });
  const code1 = [
    { text: "CREATE DATABASE", options: { color: C.red, bold: true } },
    { text: " cine;\n", options: { color: C.offWhite } },
    { text: "USE", options: { color: C.red, bold: true } },
    { text: " cine;\n\n", options: { color: C.offWhite } },
    { text: "CREATE TABLE", options: { color: C.red, bold: true } },
    { text: " pelicula (\n", options: { color: C.offWhite } },
    { text: "  id_pelicula", options: { color: C.gold } },
    { text: " INT AUTO_INCREMENT PRIMARY KEY,\n", options: { color: C.offWhite } },
    { text: "  titulo", options: { color: C.gold } },
    { text: " VARCHAR(150) NOT NULL,\n", options: { color: C.offWhite } },
    { text: "  duracion", options: { color: C.gold } },
    { text: " INT,\n", options: { color: C.offWhite } },
    { text: "  clasificacion", options: { color: C.gold } },
    { text: " VARCHAR(10),\n", options: { color: C.offWhite } },
    { text: "  genero", options: { color: C.gold } },
    { text: " VARCHAR(50)\n);\n\n", options: { color: C.offWhite } },
    { text: "CREATE TABLE", options: { color: C.red, bold: true } },
    { text: " entrada (\n", options: { color: C.offWhite } },
    { text: "  id_entrada", options: { color: C.gold } },
    { text: " INT AUTO_INCREMENT PRIMARY KEY,\n", options: { color: C.offWhite } },
    { text: "  id_venta, id_sesion, id_asiento", options: { color: C.teal } },
    { text: " INT,\n", options: { color: C.offWhite } },
    { text: "  precio", options: { color: C.gold } },
    { text: " DECIMAL(6,2),\n", options: { color: C.offWhite } },
    { text: "  UNIQUE", options: { color: C.blue } },
    { text: " (id_sesion, id_asiento)\n);", options: { color: C.offWhite } },
  ];
  s.addText(code1, { x: 0.3, y: 1.1, w: 5.3, h: 4.2, fontFace: "Consolas", fontSize: 10, lineSpacingMultiple: 1.3 });

  // Right: table list + icons
  s.addText("10 Tablas Creadas", { x: 5.9, y: 0.78, w: 3.8, h: 0.42, fontSize: 16, bold: true, color: C.gold, fontFace: "Georgia" });

  const tnames = ["departamento","empleado","cliente","pelicula","sala","asiento","sesion","venta","entrada","promocion"];
  const tcols  = [C.gold,C.teal,C.red,C.teal,C.gold,C.blue,C.blue,C.red,C.gold,C.teal];
  tnames.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.9, y: 1.28 + i * 0.39, w: 0.22, h: 0.22, fill: { color: tcols[i] }, line: { color: tcols[i] } });
    s.addText(t, { x: 6.22, y: 1.28 + i * 0.39, w: 3.4, h: 0.28, fontSize: 12, color: C.offWhite, fontFace: "Calibri" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
}

// ─────────────────────────────────────────────
// SLIDE 8 — FUNCIONALIDADES EXTRA
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("06  FUNCIONALIDADES EXTRA", {
    x: 0.4, y: 0.12, w: 9.2, h: 0.52,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  const features = [
    {
      icon: "VISTAS",
      color: C.teal,
      title: "3 Vistas",
      items: ["v_ocupacion_salas — entradas/capacidad por sesión","v_ventas_por_dia — totales agrupados por fecha","v_clientes_frecuentes — ranking por gasto total"],
    },
    {
      icon: "PROC",
      color: C.blue,
      title: "2 Procedimientos",
      items: ["sp_comprar_entrada — transacción segura con rollback","sp_actualizar_puntos — suma puntos a cliente"],
    },
    {
      icon: "FUNC",
      color: C.red,
      title: "2 Funciones",
      items: ["fn_calcular_descuento(precio, %) — devuelve precio final","fn_ocupacion_sala(sesion) — % ocupación"],
    },
    {
      icon: "TRIG",
      color: C.gold,
      title: "2 Triggers",
      items: ["tg_actualizar_puntos — AFTER INSERT en entrada","tg_verificar_aforo — BEFORE INSERT, bloquea sobreventa"],
    },
    {
      icon: "EVT",
      color: C.teal,
      title: "Evento",
      items: ["e_limpiar_ventas_antiguas — limpieza diaria de registros > 1 año"],
    },
    {
      icon: "USR",
      color: C.blue,
      title: "Usuarios y Roles",
      items: ["admin_cine — acceso total","vendedor — INSERT en ventas/entradas","consultor — solo SELECT"],
    },
  ];

  features.forEach((f, i) => {
    const col2 = i < 3 ? 0.2 : 5.15;
    const row  = i % 3;
    const y    = 0.78 + row * 1.55;
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 4.65, h: 1.38, fill: { color: C.panel }, line: { color: f.color, pt: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: col2, y, w: 0.78, h: 1.38, fill: { color: f.color, transparency: 15 }, line: { color: f.color } });
    s.addText(f.icon, { x: col2, y: y+0.1, w: 0.78, h: 0.4, fontSize: 10, bold: true, color: C.dark, align: "center", fontFace: "Consolas", margin: 0 });
    s.addText(f.title, { x: col2, y: y+0.55, w: 0.78, h: 0.38, fontSize: 9, bold: true, color: C.dark, align: "center", fontFace: "Calibri", margin: 0 });
    const lines = f.items.map((it, idx) => ({
      text: "▸ " + it + (idx < f.items.length-1 ? "\n" : ""),
      options: { color: C.offWhite, fontSize: 10, breakLine: false }
    }));
    s.addText(lines, { x: col2 + 0.86, y: y + 0.08, w: 3.66, h: 1.22, fontFace: "Calibri", fontSize: 10, lineSpacingMultiple: 1.3 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
}

// ─────────────────────────────────────────────
// SLIDE 9 — CONSULTAS
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.blue }, line: { color: C.blue } });
  s.addText("07  CONSULTAS BÁSICAS Y RESULTADOS", {
    x: 0.4, y: 0.12, w: 9.2, h: 0.52,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Georgia", charSpacing: 2
  });

  // Query 1
  s.addShape(pres.shapes.RECTANGLE, { x: 0.2, y: 0.75, w: 4.55, h: 1.25, fill: { color: C.dark }, line: { color: C.blue, pt: 1 } });
  s.addText("Sesiones por sala", { x: 0.25, y: 0.75, w: 3.5, h: 0.28, fontSize: 10, bold: true, color: C.blue, fontFace: "Calibri" });
  s.addText([
    { text: "SELECT", options: { color: C.red, bold: true } },
    { text: " s.id_sesion, p.titulo,\n       s.fecha, s.hora\n", options: { color: C.offWhite } },
    { text: "FROM", options: { color: C.red, bold: true } },
    { text: " sesion s ", options: { color: C.offWhite } },
    { text: "JOIN", options: { color: C.blue, bold: true } },
    { text: " pelicula p\n  ON s.id_pelicula = p.id_pelicula\n", options: { color: C.offWhite } },
    { text: "WHERE", options: { color: C.red, bold: true } },
    { text: " s.id_sala = 1;", options: { color: C.offWhite } },
  ], { x: 0.28, y: 1.06, w: 4.4, h: 0.88, fontFace: "Consolas", fontSize: 9, lineSpacingMultiple: 1.25 });

  // Result 1 table
  s.addTable([
    [{ text: "id_sesion", options: { bold: true, fill: { color: C.blue }, color: C.white } },
     { text: "titulo",    options: { bold: true, fill: { color: C.blue }, color: C.white } },
     { text: "fecha",     options: { bold: true, fill: { color: C.blue }, color: C.white } },
     { text: "hora",      options: { bold: true, fill: { color: C.blue }, color: C.white } }],
    ["1", "Inception",  "2026-05-05", "18:00"],
    ["2", "Titanic",    "2026-05-05", "21:00"],
  ], { x: 0.2, y: 2.1, w: 4.55, h: 0.72, fontSize: 10, colW: [0.8, 1.7, 1.25, 0.8], fontFace: "Calibri", border: { pt: 0.5, color: C.grey } });

  // Query 2
  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 0.75, w: 4.55, h: 1.25, fill: { color: C.dark }, line: { color: C.teal, pt: 1 } });
  s.addText("Clientes con más compras", { x: 5.3, y: 0.75, w: 3.8, h: 0.28, fontSize: 10, bold: true, color: C.teal, fontFace: "Calibri" });
  s.addText([
    { text: "SELECT", options: { color: C.red, bold: true } },
    { text: " c.nombre,\n  ", options: { color: C.offWhite } },
    { text: "COUNT", options: { color: C.gold } },
    { text: "(v.id_venta) AS total_compras\n", options: { color: C.offWhite } },
    { text: "FROM", options: { color: C.red, bold: true } },
    { text: " cliente c ", options: { color: C.offWhite } },
    { text: "JOIN", options: { color: C.blue, bold: true } },
    { text: " venta v\n  ON c.id_cliente = v.id_cliente\n", options: { color: C.offWhite } },
    { text: "ORDER BY", options: { color: C.red, bold: true } },
    { text: " total_compras ", options: { color: C.offWhite } },
    { text: "DESC;", options: { color: C.offWhite } },
  ], { x: 5.32, y: 1.06, w: 4.4, h: 0.88, fontFace: "Consolas", fontSize: 9, lineSpacingMultiple: 1.25 });

  s.addTable([
    [{ text: "nombre",        options: { bold: true, fill: { color: C.teal }, color: C.dark } },
     { text: "total_compras", options: { bold: true, fill: { color: C.teal }, color: C.dark } }],
    ["Carlos López",  "1"],
    ["Lucía Fernández","1"],
    ["Pedro Gómez",   "1"],
  ], { x: 5.25, y: 2.1, w: 4.55, h: 0.88, fontSize: 10, colW: [3.0, 1.55], fontFace: "Calibri", border: { pt: 0.5, color: C.grey } });

  // Query 3 — ocupacion
  s.addShape(pres.shapes.RECTANGLE, { x: 0.2, y: 3.1, w: 9.6, h: 1.3, fill: { color: C.dark }, line: { color: C.gold, pt: 1 } });
  s.addText("Ocupación por sesión", { x: 0.25, y: 3.1, w: 3.5, h: 0.28, fontSize: 10, bold: true, color: C.gold, fontFace: "Calibri" });
  s.addText([
    { text: "SELECT", options: { color: C.red, bold: true } },
    { text: " sesion.id_sesion,  ", options: { color: C.offWhite } },
    { text: "COUNT", options: { color: C.gold } },
    { text: "(entrada.id_entrada) AS entradas_vendidas,  sala.capacidad,\n  (", options: { color: C.offWhite } },
    { text: "COUNT", options: { color: C.gold } },
    { text: "(entrada.id_entrada) / sala.capacidad) * 100 AS ocupacion\n", options: { color: C.offWhite } },
    { text: "FROM", options: { color: C.red, bold: true } },
    { text: " sesion ", options: { color: C.offWhite } },
    { text: "JOIN", options: { color: C.blue, bold: true } },
    { text: " sala ON sesion.id_sala = sala.id_sala ", options: { color: C.offWhite } },
    { text: "LEFT JOIN", options: { color: C.blue, bold: true } },
    { text: " entrada ON sesion.id_sesion = entrada.id_sesion ", options: { color: C.offWhite } },
    { text: "GROUP BY", options: { color: C.red, bold: true } },
    { text: " sesion.id_sesion;", options: { color: C.offWhite } },
  ], { x: 0.28, y: 3.4, w: 9.4, h: 0.95, fontFace: "Consolas", fontSize: 9, lineSpacingMultiple: 1.25 });

  s.addTable([
    [{ text: "id_sesion", options: { bold: true, fill: { color: C.gold }, color: C.dark } },
     { text: "entradas_vendidas", options: { bold: true, fill: { color: C.gold }, color: C.dark } },
     { text: "capacidad", options: { bold: true, fill: { color: C.gold }, color: C.dark } },
     { text: "ocupacion %", options: { bold: true, fill: { color: C.gold }, color: C.dark } }],
    ["1","2","100","2.00"],
    ["2","1","100","1.00"],
    ["3","1","80", "1.25"],
    ["4","0","120","0.00"],
  ], { x: 0.2, y: 4.5, w: 9.6, h: 1.0, fontSize: 10, colW: [1.8, 2.8, 2.4, 2.6], fontFace: "Calibri", border: { pt: 0.5, color: C.grey } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.blue }, line: { color: C.blue } });
}

// ─────────────────────────────────────────────
// SLIDE 10 — CIERRE
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.red }, line: { color: C.red } });

  // Big central panel
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.7, w: 8.4, h: 4.0, fill: { color: C.panel }, line: { color: C.gold, pt: 2 } });

  s.addText("RESUMEN DEL PROYECTO", {
    x: 1, y: 0.85, w: 8, h: 0.55,
    fontSize: 24, bold: true, color: C.gold, align: "center", fontFace: "Georgia", charSpacing: 4
  });

  const stats = [
    ["10", "Tablas",       C.teal],
    ["3",  "Vistas",       C.blue],
    ["2",  "Triggers",     C.red],
    ["2",  "Procs.",       C.gold],
    ["2",  "Funciones",    C.teal],
    ["3",  "Roles",        C.blue],
  ];
  stats.forEach(([num, lbl, col], i) => {
    const x2 = 1.1 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x: x2, y: 1.6, w: 1.1, h: 1.1, fill: { color: col, transparency: 15 }, line: { color: col, pt: 2 } });
    s.addText(num, { x: x2, y: 1.65, w: 1.1, h: 0.65, fontSize: 36, bold: true, color: C.white, align: "center", fontFace: "Georgia", margin: 0 });
    s.addText(lbl, { x: x2, y: 2.3, w: 1.1, h: 0.35, fontSize: 11, color: C.offWhite, align: "center", fontFace: "Calibri", margin: 0 });
  });

  s.addText("Base de datos completamente funcional en MySQL", {
    x: 1, y: 2.9, w: 8, h: 0.42, fontSize: 15, color: C.offWhite, align: "center", fontFace: "Calibri", italic: true
  });

  s.addText("✔  Integridad referencial     ✔  Seguridad por roles     ✔  Automatización con triggers y eventos", {
    x: 1, y: 3.38, w: 8, h: 0.35, fontSize: 12, color: C.teal, align: "center", fontFace: "Calibri"
  });

  s.addText("Cine Multiplex S.A. — Proyecto de Base de Datos", {
    x: 1, y: 3.88, w: 8, h: 0.45, fontSize: 13, color: C.grey, align: "center", fontFace: "Calibri", italic: true
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
}

// Write file
pres.writeFile({ fileName: "/mnt/user-data/outputs/CineMultiplex_BaseDatos.pptx" })
  .then(() => console.log("Done"))
  .catch(e => console.error(e));
