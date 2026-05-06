const fs = require('fs');

const temario = JSON.parse(fs.readFileSync('src/data/temario.json', 'utf-8'));
const preguntasExistentes = JSON.parse(fs.readFileSync('src/data/preguntas.json', 'utf-8'));

let contador = 81;
function nextId() {
  const id = `preg-${String(contador).padStart(3, '0')}`;
  contador++;
  return id;
}

const nuevasPreguntas = [];

function addPregunta(tema_id, enunciado, respuestas, correcta, dificultad) {
  nuevasPreguntas.push({
    id: nextId(),
    enunciado,
    respuestas,
    respuesta_correcta: correcta,
    tema_id,
    dificultad
  });
}

// ==================== TEMA 1: Constitución Española (arts. 1-55) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-1',
  'Según el artículo 1.3 de la Constitución Española, la forma política del Estado español es:',
  ['A) República parlamentaria', 'B) Monarquía parlamentaria', 'C) Monarquía absoluta', 'D) República federal'],
  'B', 'básico');

addPregunta('tema-1',
  'El artículo 2 de la CE proclama la indisoluble unidad de la Nación española y reconoce el derecho a la autonomía de:',
  ['A) Las provincias', 'B) Las nacionalidades y regiones', 'C) Los municipios', 'D) Las comarcas'],
  'B', 'básico');

addPregunta('tema-1',
  'Según el artículo 3 CE, el castellano es lengua oficial del Estado, y las demás lenguas españolas serán oficiales:',
  ['A) En todo el territorio nacional', 'B) En sus respectivas Comunidades Autónomas según sus Estatutos', 'C) Únicamente en el ámbito educativo', 'D) Solo en la administración local'],
  'B', 'básico');

addPregunta('tema-1',
  'La capital del Estado, según el artículo 5 CE, es:',
  ['A) Barcelona', 'B) Madrid', 'C) Sevilla', 'D) Toledo'],
  'B', 'básico');

addPregunta('tema-1',
  'Según el artículo 53.2 CE, los derechos fundamentales reconocidos en los artículos 15 a 29 gozan de doble garantía. ¿Cuál de las siguientes opciones describe correctamente esta doble garantía?',
  ['A) Tutela ante tribunales ordinarios y recurso de amparo ante el Tribunal Constitucional', 'B) Tutela ante el Tribunal Supremo y recurso de casación', 'C) Tutela ante el Tribunal Constitucional y recurso de inconstitucionalidad', 'D) Tutela ante la Audiencia Nacional y recurso de alzada'],
  'A', 'media');

addPregunta('tema-1',
  'El artículo 54 CE establece el Defensor del Pueblo como institución encargada de:',
  ['A) Juzgar las infracciones penales cometidas por funcionarios', 'B) Supervisar la actividad administrativa y defender los derechos comprendidos en el Título I', 'C) Nombrar a los miembros del Tribunal Constitucional', 'D) Proponer reformas de la Constitución'],
  'B', 'media');

addPregunta('tema-1',
  'En relación con el artículo 55 CE sobre suspensión de derechos y libertades, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Puede suspenderse cualquier derecho fundamental sin límite temporal', 'B) La suspensión requiere acuerdo del Congreso en todos los casos', 'C) El artículo 55 permite la suspensión de derechos en casos excepcionales de interés público, con las garantías que establece la ley', 'D) Solo el Gobierno puede acordar la suspensión, sin intervención parlamentaria'],
  'C', 'avanzado');


// ==================== TEMA 2: Derechos Fundamentales (Arts. 15-29 CE) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-2',
  'Según el artículo 16 CE, ninguna confesión tiene:',
  ['A) Derecho a la libertad de culto', 'B) Carácter estatal', 'C) Derecho a la enseñanza religiosa', 'D) Derecho a la asociación'],
  'B', 'básico');

addPregunta('tema-2',
  'El artículo 17 CE establece que toda persona detenida debe ser informada inmediatamente de sus derechos y de las razones de su detención, y:',
  ['A) No podrá ser incomunicada en ningún caso', 'B) No será obligada a declarar', 'C) Deberá confesar su culpabilidad', 'D) Será juzgada en un plazo de 24 horas'],
  'B', 'básico');

addPregunta('tema-2',
  'Según el artículo 18 CE, el domicilio es:',
  ['A) Divisible entre los cónyuges', 'B) Inviolable', 'C) Sujeto a registro sin autorización judicial', 'D) De libre disposición de la Administración'],
  'B', 'básico');

addPregunta('tema-2',
  'El artículo 20 CE reconoce la libertad de expresión, de reunión y de:',
  ['A) Huelga', 'B) Manifestación', 'C) Sindicación', 'D) Educación'],
  'B', 'básico');

addPregunta('tema-2',
  'Según el artículo 21 CE, las reuniones en lugares de tránsito público requieren:',
  ['A) Autorización previa de la autoridad competente', 'B) Comunicación previa con 48 horas de antelación', 'C) Licencia municipal con 15 días de antelación', 'D) Solo notificación posterior al evento'],
  'B', 'media');

addPregunta('tema-2',
  'El artículo 24 CE reconoce el derecho a la tutela judicial efectiva. ¿Cuál de las siguientes NO es una garantía explícita de este artículo?',
  ['A) Principio de legalidad penal', 'B) Presunción de inocencia', 'C) Derecho a la asistencia de letrado', 'D) Derecho al recurso de casación automático'],
  'D', 'media');

addPregunta('tema-2',
  'En relación con el artículo 28 CE sobre libertad sindical y derecho de huelga, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) La sindicación es obligatoria para todos los trabajadores', 'B) El cierre patronal está permitido en situaciones de crisis empresarial', 'C) La ley regulará el ejercicio del derecho de huelga y garantizará la libertad sindical', 'D) Solo los funcionarios públicos pueden sindicarse'],
  'C', 'avanzado');


// ==================== TEMA 3: Organización Territorial (Arts. 137-158 CE) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-3',
  'Según el artículo 140 CE, el gobierno de los municipios corresponde a:',
  ['A) Las Diputaciones Provinciales', 'B) Los Ayuntamientos, integrados por el Alcalde y los Concejales', 'C) Las Juntas de Comunidades Autónomas', 'D) El Delegado del Gobierno'],
  'B', 'básico');

addPregunta('tema-3',
  'El artículo 141 CE establece que el gobierno de las provincias corresponde a:',
  ['A) Los Ayuntamientos', 'B) Las Diputaciones Provinciales u otras corporaciones de ámbito provincial', 'C) Las Cortes Generales', 'D) El Ministerio del Interior'],
  'B', 'básico');

addPregunta('tema-3',
  'Según el artículo 147 CE, los Estatutos de Autonomía son:',
  ['A) Leyes ordinarias del Estado', 'B) La norma institucional básica de cada Comunidad Autónoma', 'C) Reglamentos del Congreso de los Diputados', 'D) Decretos del Gobierno central'],
  'B', 'básico');

addPregunta('tema-3',
  'El artículo 150 CE permite al Estado:',
  ['A) Suprimir las Comunidades Autónomas', 'B) Delegar en CCAA la ejecución de servicios estatales y transferir competencias mediante leyes orgánicas', 'C) Imponer tributos exclusivos a las CCAA', 'D) Disolver los parlamentos autonómicos'],
  'B', 'básico');

addPregunta('tema-3',
  'Según el artículo 148 CE, las Comunidades Autónomas pueden asumir competencias en materia de:',
  ['A) Defensa nacional y relaciones internacionales', 'B) Cultura, medio ambiente, urbanismo, servicios sociales y turismo', 'C) Legislación penal y civil', 'D) Régimen electoral general y armas'],
  'B', 'media');

addPregunta('tema-3',
  'El artículo 149.3 CE establece que las competencias no atribuidas expresamente al Estado por la Constitución:',
  ['A) Corresponden al Estado por defecto', 'B) Corresponden a las Comunidades Autónomas conforme a sus Estatutos', 'C) Son competencia exclusiva de los municipios', 'D) Requieren una nueva ley orgánica para su atribución'],
  'B', 'media');

addPregunta('tema-3',
  'En relación con la distribución de competencias entre el Estado y las Comunidades Autónomas, ¿cuál de las siguientes afirmaciones es correcta según la doctrina constitucional?',
  ['A) Las competencias exclusivas del Estado son intransferibles en todos los casos', 'B) El artículo 149.3 actúa como una cláusula residual a favor de las CCAA, pero su aplicación está condicionada a los Estatutos de Autonomía', 'C) Las CCAA pueden legislar en materia penal siempre que no contradigan la legislación estatal', 'D) Las competencias autonómicas del artículo 148 son obligatorias para todas las CCAA'],
  'B', 'avanzado');


// ==================== TEMA 4: Ley 39/2015 (Procedimiento Administrativo) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-4',
  'Según el artículo 13 de la Ley 39/2015, los ciudadanos tienen derecho a:',
  ['A) Exigir indemnización por daños derivados de la Administración', 'B) No presentar documentos ya en poder de la Administración', 'C) Elegir al funcionario que tramite su expediente', 'D) Rechazar cualquier notificación administrativa'],
  'B', 'básico');

addPregunta('tema-4',
  'La Ley 39/2015 establece que el cómputo de plazos se realiza en:',
  ['A) Días naturales', 'B) Días hábiles, excluidos sábados, domingos y festivos', 'C) Semanas completas', 'D) Meses de 30 días'],
  'B', 'básico');

addPregunta('tema-4',
  'Según la Ley 39/2015, la ampliación de plazos en procedimientos administrativos no podrá superar:',
  ['A) El plazo original', 'B) El doble del plazo original', 'C) El triple del plazo original', 'D) Seis meses'],
  'B', 'básico');

addPregunta('tema-4',
  'El recurso de reposición, según la Ley 39/2015, debe interponerse ante:',
  ['A) El órgano superior jerárquico', 'B) El mismo órgano que dictó el acto', 'C) El Tribunal Superior de Justicia', 'D) El Defensor del Pueblo'],
  'B', 'básico');

addPregunta('tema-4',
  'Según la Ley 39/2015, el plazo para interponer recurso contencioso-administrativo contra la resolución de un recurso administrativo es de:',
  ['A) 1 mes', 'B) 2 meses', 'C) 3 meses', 'D) 6 meses'],
  'B', 'media');

addPregunta('tema-4',
  'El recurso extraordinario de revisión, regulado en la Ley 39/2015, puede interponerse por causas tasadas como error de hecho, documentos decisivos desconocidos o prevaricación. Su plazo general es de:',
  ['A) 1 mes', 'B) 3 meses', 'C) 4 años o 3 meses según la causa', 'D) 1 año'],
  'C', 'media');

addPregunta('tema-4',
  'En relación con la iniciación del procedimiento administrativo según la Ley 39/2015, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Las solicitudes solo pueden presentarse en el registro del órgano competente', 'B) Las solicitudes pueden presentarse en el registro electrónico de cualquier órgano de la AGE, CCAA o EELL, en oficinas de correos o mediante representante', 'C) La iniciación de oficio requiere siempre autorización judicial previa', 'D) Los procedimientos de oficio no pueden iniciarse sin solicitud previa del interesado'],
  'B', 'avanzado');


// ==================== TEMA 5: Ley 40/2015 (Régimen Jurídico del Sector Público) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-5',
  'Según la Ley 40/2015, las deliberaciones de los órganos colegiados son:',
  ['A) Públicas en todos los casos', 'B) Secretas salvo acuerdo en contrario', 'C) Publicadas en el Boletín Oficial', 'D) Grabadas y difundidas por internet'],
  'B', 'básico');

addPregunta('tema-5',
  'La avocación, regulada en el artículo 10 de la Ley 40/2015, consiste en:',
  ['A) Delegar la firma de un acto en otro funcionario', 'B) Asumir por el órgano superior la competencia de un órgano inferior', 'C) Encomendar la gestión de un servicio a otra entidad', 'D) Designar un sustituto temporal'],
  'B', 'básico');

addPregunta('tema-5',
  'Según los artículos 23 y 24 de la Ley 40/2015, los miembros de órganos administrativos deben abstenerse cuando exista parentesco hasta el grado:',
  ['A) Primero', 'B) Segundo', 'C) Tercero', 'D) Cuarto'],
  'B', 'básico');

addPregunta('tema-5',
  'Los actos anulables según el artículo 40 de la Ley 40/2015 incluyen:',
  ['A) Incompetencia manifiesta del órgano', 'B) Defecto de forma no esencial, vicio en el procedimiento o infracción de normas de derecho local', 'C) Objeto imposible', 'D) Contenido contrario a la ley'],
  'B', 'básico');

addPregunta('tema-5',
  'La encomienda de gestión, regulada en el artículo 11 de la Ley 40/2015, permite:',
  ['A) Transferir la titularidad de una competencia a otra Administración', 'B) Encomendar a otro órgano de la misma o diferente Administración la gestión de un servicio público, sin transferir la titularidad', 'C) Delegar la firma de actos administrativos', 'D) Designar personal eventual para puestos de confianza'],
  'B', 'media');

addPregunta('tema-5',
  'Según la Ley 40/2015, los convenios de colaboración entre Administraciones requieren:',
  ['A) Aprobación del Pleno de la Corporación local y publicación en el Boletín oficial correspondiente', 'B) Solo la firma de los alcaldes implicados', 'C) Autorización del Ministerio de Hacienda', 'D) Registro en el Tribunal Constitucional'],
  'A', 'media');

addPregunta('tema-5',
  'En relación con la conversión de actos nulos y anulables según el artículo 42 de la Ley 40/2015, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Los actos nulos pueden convertirse en anulables si se subsanan sus defectos', 'B) Los actos anulables pueden convertirse en válidos si se subsanan sus defectos antes de la resolución del recurso', 'C) Los actos nulos de pleno derecho pueden convertirse en válidos mediante acuerdo de las partes', 'D) La conversión solo es posible entre actos administrativos y actos de derecho privado'],
  'B', 'avanzado');


// ==================== TEMA 6: TREBEP (RD Leg. 5/2015) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-6',
  'Según el artículo 8 del TREBEP, los funcionarios interinos son nombrados por:',
  ['A) Concurso-oposición libre', 'B) Necesidad o urgencia, vacante no cubierta o sustitución', 'C) Libre designación del Ministro', 'D) Comisión de servicios'],
  'B', 'básico');

addPregunta('tema-6',
  'El Grupo A2 de clasificación del TREBEP requiere como titulación:',
  ['A) Doctor o Licenciado', 'B) Bachelor/Grado, Ingeniero Técnico, Arquitecto Técnico o equivalente', 'C) Bachiller o Técnico', 'D) ESO o Técnico Auxiliar'],
  'B', 'básico');

addPregunta('tema-6',
  'Según el artículo 14 del TREBEP, los empleados públicos tienen derecho a:',
  ['A) Incompatibilidad absoluta con cualquier actividad privada', 'B) Remuneración, carrera administrativa, formación, negociación colectiva y huelga', 'C) Jubilación anticipada sin requisitos', 'D) Inmunidad penal en el ejercicio de sus funciones'],
  'B', 'básico');

addPregunta('tema-6',
  'El acceso a la función pública, según el TREBEP, garantiza el principio de:',
  ['A) Antigüedad', 'B) Mérito y capacidad', 'C) Amistad y lealtad', 'D) Parentesco'],
  'B', 'básico');

addPregunta('tema-6',
  'Según el artículo 52 del TREBEP, el deber de dedicación profesional implica:',
  ['A) Trabajar exclusivamente en horario nocturno', 'B) Cumplimiento de la jornada y actualización de conocimientos', 'C) Renuncia a la vida privada', 'D) Obligación de residir en la capital de la provincia'],
  'B', 'media');

addPregunta('tema-6',
  'El personal laboral al servicio de las Administraciones Públicas, según el TREBEP, se contrata en régimen de:',
  ['A) Derecho administrativo', 'B) Derecho laboral (fijo, temporal, indefinido no fijo)', 'C) Derecho mercantil', 'D) Derecho internacional público'],
  'B', 'media');

addPregunta('tema-6',
  'En relación con la provisión de puestos de trabajo según el TREBEP, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Todos los puestos se proveen exclusivamente por concurso-oposición libre', 'B) Los puestos se pueden proveer mediante concurso-oposición libre, concurso de méritos, libre designación o comisión de servicios', 'C) La libre designación solo es válida para personal eventual', 'D) La comisión de servicios requiere oposición previa obligatoria'],
  'B', 'avanzado');


// ==================== TEMA 7: Ley 53/1984 (Incompatibilidades) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-7',
  'Según la Ley 53/1984, el ejercicio de la abogacía o procurador en asuntos contra la Administración de la que dependa el empleado público constituye:',
  ['A) Una compatibilidad automática', 'B) Una incompatibilidad absoluta', 'C) Una incompatibilidad relativa', 'D) Una actividad permitida sin autorización'],
  'B', 'básico');

addPregunta('tema-7',
  'Las incompatibilidades relativas según el artículo 7 de la Ley 53/1984 requieren:',
  ['A) Renuncia al empleo público', 'B) Autorización previa, siempre que no supongan menoscabo de la independencia o infracción del deber de dedicación', 'C) Pago de una tasa administrativa', 'D) Concurso-oposición específica'],
  'B', 'básico');

addPregunta('tema-7',
  'Según la Ley 53/1984, los altos cargos deben declarar sus bienes y actividades:',
  ['A) Solo al tomar posesión', 'B) Al tomar posesión y al cesar', 'C) Anualmente durante su mandato', 'D) Solo si superan un valor de 500.000 euros'],
  'B', 'básico');

addPregunta('tema-7',
  'La Ley 53/1984 se aplica a:',
  ['A) Solo funcionarios de carrera', 'B) Funcionarios, personal laboral, personal eventual y altos cargos', 'C) Solo altos cargos del Estado', 'D) Únicamente empleados de la Administración General del Estado'],
  'B', 'básico');

addPregunta('tema-7',
  'Según la Ley 53/1984, la autorización para compatibilizar actividades privadas la concede:',
  ['A) El Presidente del Gobierno', 'B) El Ministro o titular del órgano competente', 'C) El Tribunal Constitucional', 'D) El Defensor del Pueblo'],
  'B', 'media');

addPregunta('tema-7',
  'En materia de incompatibilidades relativas, la Ley 53/1984 establece que NO se autorizará cuando la actividad privada se ejerza:',
  ['A) En horario nocturno', 'B) En el mismo ámbito territorial y materia que la pública', 'C) En el extranjero', 'D) Durante más de 10 horas semanales'],
  'B', 'media');

addPregunta('tema-7',
  'Respecto a las incompatibilidades de los altos cargos según la Ley 53/1984, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Los altos cargos pueden desempeñar actividades privadas retribuidas durante su mandato si obtienen autorización', 'B) Los altos cargos no pueden desempeñar actividades privadas retribuidas durante su mandato ni en los dos años siguientes a su cese en el mismo ámbito materia y territorio', 'C) La incompatibilidad post-cese solo aplica a altos cargos del poder judicial', 'D) Los altos cargos están exentos de declarar bienes si su patrimonio es inferior a 100.000 euros'],
  'B', 'avanzado');


// ==================== TEMA 8: Ley 19/2013 (Transparencia) ====================
// 4 básicas, 2 medias, 1 avanzada

addPregunta('tema-8',
  'La Ley 19/2013 se aplica, entre otros, a:',
  ['A) Solo a la Administración General del Estado', 'B) A la AGE, CCAA, EELL, universidades públicas, Fuerzas y Cuerpos de Seguridad y entidades públicas dependientes', 'C) Únicamente a entidades privadas', 'D) Solo a organismos internacionales'],
  'B', 'básico');

addPregunta('tema-8',
  'Según el artículo 6 de la Ley 19/2013, la publicidad activa debe realizarse en:',
  ['A) El Boletín Oficial del Estado únicamente', 'B) Los portales web de las Administraciones de forma reutilizable', 'C) Los tablones de anuncios de cada ministerio', 'D) La prensa escrita nacional'],
  'B', 'básico');

addPregunta('tema-8',
  'La información que debe facilitarse según la Ley 19/2013 debe ser:',
  ['A) Solo informativa general', 'B) Clara, completa, precisa, actual y veraz', 'C) Resumida y simplificada', 'D) Solo en formato papel'],
  'B', 'básico');

addPregunta('tema-8',
  'Según el artículo 14 de la Ley 19/2013, NO se facilitará información que afecte a:',
  ['A) Los presupuestos generales del Estado', 'B) La seguridad nacional, defensa, relaciones internacionales, orden público y protección de datos personales', 'C) Las subvenciones públicas', 'D) Los contratos menores'],
  'B', 'básico');

addPregunta('tema-8',
  'La reutilización de la información del sector público según la Ley 19/2013 se facilita:',
  ['A) Solo a entidades públicas', 'B) En condiciones no discriminatorias y por precios marginales', 'C) Exclusivamente mediante concurso público', 'D) Solo para fines comerciales autorizados'],
  'B', 'media');

addPregunta('tema-8',
  'Según la Ley 19/2013, en materia de reutilización de información se excluye:',
  ['A) Los datos estadísticos', 'B) El software, los documentos en poder de organismos de radiodifusión y las instituciones culturales', 'C) La normativa jurídica', 'D) Los informes de gestión'],
  'B', 'media');

addPregunta('tema-8',
  'En relación con el acceso a la información pública regulado en la Ley 19/2013, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Solo los ciudadanos españoles tienen derecho a solicitar información', 'B) Toda persona tiene derecho a solicitar y obtener información de cualquier órgano de la Administración Pública, y el silencio administrativo es estimatorio', 'C) El plazo de resolución es de 3 meses', 'D) La información solicitada debe pagarse siempre con una tasa de 50 euros'],
  'B', 'avanzado');


// ==================== TEMA 9: Ley 31/1995 (Prevención de Riesgos Laborales) ====================
// 2 básicas, 2 medias, 2 avanzadas

addPregunta('tema-9',
  'Según el artículo 15 de la Ley 31/1995, el principio de "combatir los riesgos en su origen" ocupa el lugar número:',
  ['A) Primero', 'B) Segundo', 'C) Tercero', 'D) Cuarto'],
  'C', 'básico');

addPregunta('tema-9',
  'La Ley 31/1995 se aplica a:',
  ['A) Solo al sector privado', 'B) Todos los sectores de actividad pública y privada', 'C) Solo a empresas de más de 50 trabajadores', 'D) Únicamente a la construcción y minería'],
  'B', 'básico');

addPregunta('tema-9',
  'Según la Ley 31/1995, el empresario debe designar trabajadores con funciones de prevención o:',
  ['A) Contratar servicios de prevención ajena', 'B) Designar a un familiar del empresario', 'C) Nombrar un delegado sindical', 'D) Solicitar autorización al Ministerio de Trabajo'],
  'A', 'media');

addPregunta('tema-9',
  'El artículo 15 de la Ley 31/1995 establece que se deben adoptar medidas prioritarias de protección:',
  ['A) Individual frente a la colectiva', 'B) Colectiva frente a la individual', 'C) Solo para trabajadores mayores de 55 años', 'D) Exclusivamente para trabajadores con contrato indefinido'],
  'B', 'media');

addPregunta('tema-9',
  'En relación con las infracciones y sanciones de la Ley 31/1995, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Solo existen infracciones leves y graves', 'B) Las sanciones económicas son proporcionales a la naturaleza de la infracción y al número de trabajadores afectados, existiendo infracciones leves, graves y muy graves', 'C) Las sanciones solo pueden ser de carácter penal', 'D) El empresario está exento de sanciones si contrata un servicio de prevención ajena'],
  'B', 'avanzado');

addPregunta('tema-9',
  'Según la Ley 31/1995, el derecho de los trabajadores a interrumpir la actividad ante situaciones de riesgo grave e inminente implica:',
  ['A) Que el trabajador puede abandonar el puesto sin comunicarlo', 'B) Que el trabajador debe informar inmediatamente a su superior jerárquico y no puede ser sancionado por ello', 'C) Que solo los delegados de prevención pueden interrumpir la actividad', 'D) Que el empresario puede despedir al trabajador que interrumpa la actividad'],
  'B', 'avanzado');


// ==================== TEMA 10: Ley Orgánica 3/2007 (Igualdad) ====================
// 2 básicas, 2 medias, 2 avanzadas

addPregunta('tema-10',
  'Según la Ley Orgánica 3/2007, las Administraciones Públicas deben fomentar la presencia equilibrada de mujeres y hombres en:',
  ['A) Los órganos colegiados y puestos de responsabilidad', 'B) Únicamente en los puestos técnicos', 'C) Solo en la administración local', 'D) Los centros educativos'],
  'A', 'básico');

addPregunta('tema-10',
  'El Instituto de la Mujer y para la Igualdad de Oportunidades es el órgano encargado de:',
  ['A) Juzgar casos de violencia de género', 'B) Impulsar, ejecutar y evaluar las políticas de igualdad', 'C) Sancionar a empresas sin plan de igualdad', 'D) Nombrar a los miembros de la Comisión Interministerial'],
  'B', 'básico');

addPregunta('tema-10',
  'Según la Ley Orgánica 3/2007, el derecho a la adaptación de la jornada y a la reducción por guarda legal se refiere a:',
  ['A) Menores o personas dependientes a cargo del trabajador', 'B) Solo a hijos menores de 3 años', 'C) Únicamente a personas con discapacidad', 'D) Solo a familias numerosas'],
  'A', 'media');

addPregunta('tema-10',
  'La Comisión Interministerial para la Igualdad de Mujeres y Hombres, según la Ley Orgánica 3/2007, tiene como función:',
  ['A) Sancionar infracciones por discriminación', 'B) Coordinar las políticas de igualdad', 'C) Dictar sentencias en materia de violencia de género', 'D) Gestionar el presupuesto del Instituto de la Mujer'],
  'B', 'media');

addPregunta('tema-10',
  'En relación con los planes de igualdad de la Ley Orgánica 3/2007, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Son obligatorios en todas las empresas, independientemente de su tamaño', 'B) Son obligatorios en empresas de más de 250 trabajadores y deben incluir medidas para evitar la discriminación por razón de sexo', 'C) Solo son recomendables y no tienen carácter obligatorio', 'D) Son obligatorios solo en el sector público'],
  'B', 'avanzado');

addPregunta('tema-10',
  'La Ley Orgánica 3/2007, en relación con el Estatuto de los Trabajadores, establece la prohibición de despido por razón de:',
  ['A) Solo por razón de sexo', 'B) Sexo, estado civil, edad, origen racial o étnico, discapacidad, orientación sexual, etc.', 'C) Únicamente por razón de edad', 'D) Solo por razón de discapacidad'],
  'B', 'avanzado');


// ==================== TEMA 11: Ley Orgánica 3/2018 (Protección de Datos) ====================
// 2 básicas, 2 medias, 2 avanzadas

addPregunta('tema-11',
  'La Ley Orgánica 3/2018 adapta el ordenamiento jurídico español al:',
  ['A) Reglamento (UE) 2016/679 (GDPR)', 'B) Directiva 95/46/CE', 'C) Convenio 108 del Consejo de Europa', 'D) Reglamento (UE) 2018/1725'],
  'A', 'básico');

addPregunta('tema-11',
  'Según el artículo 4 de la Ley Orgánica 3/2018, el principio de minimización de datos establece que los datos deben ser:',
  ['A) Ilimitados en cantidad', 'B) Adecuados, pertinentes y limitados a lo necesario', 'C) Conservados indefinidamente', 'D) Compartidos con todas las Administraciones'],
  'B', 'básico');

addPregunta('tema-11',
  'El derecho de portabilidad de los datos, reconocido en la Ley Orgánica 3/2018, permite al interesado:',
  ['A) Solicitar la supresión total de sus datos', 'B) Recibir los datos en un formato estructurado y transmitirlos a otro responsable', 'C) Oponerse al tratamiento en todos los casos', 'D) Modificar los datos de otros interesados'],
  'B', 'media');

addPregunta('tema-11',
  'Según la Ley Orgánica 3/2018, el encargado del tratamiento:',
  ['A) Determina los fines y medios del tratamiento', 'B) Trata datos por cuenta del responsable', 'C) Es el titular de los datos personales', 'D) Designa al Delegado de Protección de Datos'],
  'B', 'media');

addPregunta('tema-11',
  'En relación con el Delegado de Protección de Datos (DPD) según la Ley Orgánica 3/2018, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Es obligatorio en todas las empresas que traten datos personales', 'B) Es obligatorio en autoridades y organismos públicos, salvo cuando las funciones son compatibles con las del responsable por su naturaleza, ámbito y finalidades', 'C) Solo es obligatorio en entidades bancarias y aseguradoras', 'D) El DPD debe ser siempre un abogado colegiado'],
  'B', 'avanzado');

addPregunta('tema-11',
  'Según la Ley Orgánica 3/2018, las decisiones individuales automatizadas, incluida la elaboración de perfiles:',
  ['A) Están permitidas sin limitación alguna', 'B) El interesado tiene derecho a no ser objeto de ellas, salvo en ciertos supuestos previstos por la ley', 'C) Solo afectan a datos de menores de edad', 'D) Son obligatorias para todos los tratamientos del sector público'],
  'B', 'avanzado');


// ==================== TEMA 12: TRLHL (RD Leg. 2/2004) ====================
// 2 básicas, 2 medias, 2 avanzadas

addPregunta('tema-12',
  'El TRLHL (RD Leg. 2/2004) se compone de:',
  ['A) Dos libros', 'B) Tres libros: Régimen financiero, Tributos locales y Régimen de eficacia tributaria', 'C) Cuatro libros', 'D) Cinco libros'],
  'B', 'básico');

addPregunta('tema-12',
  'El tipo de gravamen máximo del IBI para inmuebles rústicos, según el TRLHL, es del:',
  ['A) 0,5%', 'B) 0,9%', 'C) 1,1%', 'D) 1,5%'],
  'B', 'básico');

addPregunta('tema-12',
  'Según el TRLHL, los precios públicos son ingresos derivados de:',
  ['A) La prestación de servicios públicos obligatorios', 'B) La prestación de servicios o actividades de competencia local cuando la Ley no exija su prestación gratuita ni su sujeción a tasas', 'C) La recaudación de impuestos locales', 'D) Las transferencias del Estado'],
  'B', 'media');

addPregunta('tema-12',
  'El Impuesto sobre Actividades Económicas (IAE), según el TRLHL, gestiona:',
  ['A) El Ministerio de Hacienda', 'B) El Ayuntamiento donde se ejerza la actividad', 'C) La Diputación Provincial', 'D) La Comunidad Autónoma'],
  'B', 'media');

addPregunta('tema-12',
  'En relación con las tasas reguladas en el TRLHL, ¿cuál de las siguientes afirmaciones es correcta?',
  ['A) Las tasas pueden exigirse por servicios no prestados efectivamente', 'B) Requieren prestación efectiva, solicitud o recepción voluntaria, y que no estén sujetas a precio público', 'C) Las tasas son obligatorias para todos los ciudadanos del municipio', 'D) Las tasas solo pueden aplicarse a servicios de competencia estatal'],
  'B', 'avanzado');

addPregunta('tema-12',
  'Según el TRLHL, las bonificaciones del IBI pueden aplicarse por:',
  ['A) Solo por antigüedad del inmueble', 'B) Familia numerosa, discapacidad e instalación de sistemas de ahorro energético', 'C) Únicamente por renta del titular', 'D) Solo para inmuebles de nueva construcción'],
  'B', 'avanzado');


// Verificar totales
console.log('Total nuevas preguntas:', nuevasPreguntas.length);
const basicas = nuevasPreguntas.filter(p => p.dificultad === 'básico').length;
const medias = nuevasPreguntas.filter(p => p.dificultad === 'media').length;
const avanzadas = nuevasPreguntas.filter(p => p.dificultad === 'avanzado').length;
console.log('Básicas:', basicas, 'Medias:', medias, 'Avanzadas:', avanzadas);

// Verificar distribución por tema
const dist = {};
nuevasPreguntas.forEach(p => { dist[p.tema_id] = (dist[p.tema_id] || 0) + 1; });
console.log('Distribución por tema:', dist);

// Combinar y guardar
const todasPreguntas = [...preguntasExistentes, ...nuevasPreguntas];
fs.writeFileSync('src/data/preguntas.json', JSON.stringify(todasPreguntas, null, 2) + '\n');
console.log('Archivo guardado. Total preguntas:', todasPreguntas.length);
