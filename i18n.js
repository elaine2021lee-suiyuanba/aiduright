// AiduRight — internationalization (English / Español / 中文)
//
// Loaded BEFORE app.js. Provides:
//   - I18N.ui        : interface strings
//   - I18N.categories: benefit category names
//   - I18N.questions : questionnaire text + option labels (es/zh only; en falls
//                      back to the labels already in app.js)
//   - t(), tCategory(), tQuestionText(), tOptionLabel(), localizeBenefit()
//   - setLang(), current language, and a language switcher wired to [data-lang]
//
// Benefit program translations live in benefits.i18n.js (window.BENEFITS_I18N),
// populated separately; localizeBenefit() falls back to English when missing.

const I18N = {
  langs: [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'zh', label: '中文' }
  ],

  ui: {
    en: {
      tagline: 'Find government benefits you qualify for',
      introBadge: 'Free & private · No account needed',
      introTitle: 'Get matched to benefits in minutes',
      introLead: "Answer a few simple questions and we'll show you the programs you may qualify for.",
      trust1: 'Takes about 3 minutes',
      trust2: 'Your answers stay on your device',
      trust3: 'Covers food, health, housing, cash & more',
      startBtn: 'Get Started',
      privacyNote: 'No data stored · Nothing leaves your browser',
      footerPrivacy: 'Private by design — no accounts, no tracking, no data stored.',
      footerDisclaimer: 'AiduRight is for informational purposes only and is not an official eligibility determination. Always verify with the official program. Need help now? Call 211.',
      loading: 'Finding programs for you…',
      back: 'Back',
      next: 'Next',
      seeResults: 'See My Results',
      fieldError: 'Please select an answer to continue.',
      quickScan: 'Quick Scan',
      deepScan: 'Deep Scan',
      questionCounter: 'Question {n} of {total}',
      chooseAll: 'Choose all that apply.',
      resultsSingular: 'program you may qualify for',
      resultsPlural: 'programs you may qualify for',
      resultsLead: 'Review each one below and tap “How to apply” for the steps.',
      disclaimerResults: 'These are preliminary matches. Actual eligibility depends on additional factors — always verify with the official program.',
      visitSite: 'Visit official site',
      howToApply: 'How to apply',
      noMatchTitle: 'No matches found yet',
      noMatchBody: "Based on your answers, we didn't find matching programs right now. This does not mean you're ineligible — many programs have exceptions.",
      noMatchHelp: 'Free help is available. Call:',
      unlockTitle: 'Find even more benefits',
      unlockBody: 'A few more optional questions can uncover additional programs — like veteran benefits, specialized housing, and education grants.',
      unlockBtn: 'Answer a few more questions',
      restart: 'Start Over',
      print: 'Print / Save PDF',
      copy: 'Copy list',
      copied: 'Copied!',
      share: 'Share',
      transNote: 'Program details are machine-translated — please confirm with the official program.',
      summaryTitle: 'AiduRight — programs you may qualify for',
      langLabel: 'Language',
      docsCardTitle: 'Documents to prepare',
      docsChecklistTitle: 'Your document checklist',
      docsChecklistLead: 'Gather these once — they cover all your matched programs.',
      docsNone: 'No documents needed to get started.'
    },
    es: {
      tagline: 'Encuentra beneficios del gobierno para los que califiques',
      introBadge: 'Gratis y privado · Sin cuenta',
      introTitle: 'Encuentra beneficios en minutos',
      introLead: 'Responde unas preguntas sencillas y te mostraremos los programas para los que podrías calificar.',
      trust1: 'Toma unos 3 minutos',
      trust2: 'Tus respuestas se quedan en tu dispositivo',
      trust3: 'Cubre comida, salud, vivienda, dinero y más',
      startBtn: 'Comenzar',
      privacyNote: 'No se guardan datos · Nada sale de tu navegador',
      footerPrivacy: 'Privado por diseño: sin cuentas, sin rastreo, sin datos guardados.',
      footerDisclaimer: 'AiduRight es solo informativo y no es una determinación oficial de elegibilidad. Verifica siempre con el programa oficial. ¿Necesitas ayuda ahora? Llama al 211.',
      loading: 'Buscando programas para ti…',
      back: 'Atrás',
      next: 'Siguiente',
      seeResults: 'Ver mis resultados',
      fieldError: 'Selecciona una respuesta para continuar.',
      quickScan: 'Escaneo rápido',
      deepScan: 'Escaneo detallado',
      questionCounter: 'Pregunta {n} de {total}',
      chooseAll: 'Elige todas las que apliquen.',
      resultsSingular: 'programa para el que podrías calificar',
      resultsPlural: 'programas para los que podrías calificar',
      resultsLead: 'Revisa cada uno y toca “Cómo solicitar” para ver los pasos.',
      disclaimerResults: 'Estos son resultados preliminares. La elegibilidad real depende de otros factores; verifica siempre con el programa oficial.',
      visitSite: 'Visitar sitio oficial',
      howToApply: 'Cómo solicitar',
      noMatchTitle: 'Aún no hay resultados',
      noMatchBody: 'Según tus respuestas, no encontramos programas ahora. Esto no significa que no califiques; muchos programas tienen excepciones.',
      noMatchHelp: 'Hay ayuda gratuita disponible. Llama a:',
      unlockTitle: 'Encuentra aún más beneficios',
      unlockBody: 'Unas preguntas opcionales más pueden revelar programas adicionales, como beneficios para veteranos, vivienda especializada y becas educativas.',
      unlockBtn: 'Responder unas preguntas más',
      restart: 'Empezar de nuevo',
      print: 'Imprimir / Guardar PDF',
      copy: 'Copiar lista',
      copied: '¡Copiado!',
      share: 'Compartir',
      transNote: 'Los detalles del programa están traducidos automáticamente; confírmalos con el programa oficial.',
      summaryTitle: 'AiduRight — programas para los que podrías calificar',
      langLabel: 'Idioma',
      docsCardTitle: 'Documentos que necesitas',
      docsChecklistTitle: 'Tu lista de documentos',
      docsChecklistLead: 'Reúnelos una vez: cubren todos tus programas.',
      docsNone: 'No necesitas documentos para empezar.'
    },
    zh: {
      tagline: '找到你符合条件的政府福利',
      introBadge: '免费 · 隐私 · 无需账号',
      introTitle: '几分钟找到适合你的福利',
      introLead: '回答几个简单的问题,我们会告诉你可能符合条件的项目。',
      trust1: '大约 3 分钟',
      trust2: '你的回答只留在本机',
      trust3: '涵盖食物、医疗、住房、现金等',
      startBtn: '开始',
      privacyNote: '不保存数据 · 不离开你的浏览器',
      footerPrivacy: '隐私优先 —— 无账号、无追踪、不保存数据。',
      footerDisclaimer: 'AiduRight 仅供参考,不构成官方资格认定。请务必与官方项目核实。需要帮助?拨打 211。',
      loading: '正在为你查找项目…',
      back: '返回',
      next: '下一步',
      seeResults: '查看我的结果',
      fieldError: '请选择一个答案再继续。',
      quickScan: '快速筛查',
      deepScan: '深度筛查',
      questionCounter: '第 {n} 题,共 {total} 题',
      chooseAll: '可多选。',
      resultsSingular: '个你可能符合条件的项目',
      resultsPlural: '个你可能符合条件的项目',
      resultsLead: '逐条查看,点击“如何申请”查看步骤。',
      disclaimerResults: '以下为初步匹配。实际资格取决于更多因素,请务必与官方项目核实。',
      visitSite: '访问官方网站',
      howToApply: '如何申请',
      noMatchTitle: '暂未找到匹配',
      noMatchBody: '根据你的回答,暂时没有匹配到项目。这并不代表你不符合条件 —— 很多项目有例外情况。',
      noMatchHelp: '有免费帮助。请拨打:',
      unlockTitle: '发现更多福利',
      unlockBody: '再回答几个可选问题,可能发现更多项目 —— 如退伍军人福利、专项住房和教育补助。',
      unlockBtn: '再答几个问题',
      restart: '重新开始',
      print: '打印 / 存为 PDF',
      copy: '复制清单',
      copied: '已复制!',
      share: '分享',
      transNote: '项目详情为机器翻译,请以官方项目为准。',
      summaryTitle: 'AiduRight —— 你可能符合条件的项目',
      langLabel: '语言',
      docsCardTitle: '需要准备的材料',
      docsChecklistTitle: '你的材料清单',
      docsChecklistLead: '备齐这些即可 —— 覆盖你匹配到的所有项目。',
      docsNone: '无需材料即可开始。'
    }
  },

  // Canonical document types — programs reference these keys; labels shown per language.
  documents: {
    photo_id:          { en: "Government photo ID (driver's license, state ID, or passport)", es: 'Identificación con foto del gobierno (licencia, ID estatal o pasaporte)', zh: '政府带照片证件(驾照、州证件或护照)' },
    ssn:               { en: 'Social Security number or card', es: 'Número o tarjeta de Seguro Social', zh: '社会安全号码(SSN)或卡' },
    proof_income:      { en: 'Proof of income (recent pay stubs or benefit letters)', es: 'Comprobante de ingresos (recibos de pago recientes o cartas de beneficios)', zh: '收入证明(近期工资单或福利证明信)' },
    tax_return:        { en: 'Most recent tax return', es: 'Declaración de impuestos más reciente', zh: '最近一年的报税表' },
    proof_address:     { en: 'Proof of California address (utility bill or lease)', es: 'Comprobante de domicilio en California (recibo de servicios o contrato de renta)', zh: '加州住址证明(水电账单或租约)' },
    immigration_docs:  { en: 'Immigration or legal status documents (if applicable)', es: 'Documentos de inmigración o estatus legal (si aplica)', zh: '移民或合法身份文件(如适用)' },
    bank_statements:   { en: 'Bank statements or proof of assets', es: 'Estados de cuenta bancarios o comprobante de bienes', zh: '银行对账单或资产证明' },
    medical_records:   { en: "Medical records or a doctor's certification", es: 'Registros médicos o certificación de un médico', zh: '医疗记录或医生证明' },
    dd214:             { en: 'DD-214 (military discharge papers)', es: 'DD-214 (papeles de baja militar)', zh: 'DD-214(退伍证明文件)' },
    lease:             { en: 'Lease or rental agreement', es: 'Contrato de arrendamiento o renta', zh: '租约或租房协议' },
    proof_pregnancy:   { en: "Proof of pregnancy (doctor's note)", es: 'Comprobante de embarazo (nota del médico)', zh: '怀孕证明(医生证明)' },
    school_enrollment: { en: 'Proof of school enrollment or a completed FAFSA', es: 'Comprobante de inscripción escolar o FAFSA', zh: '在校证明或已填的 FAFSA' },
    benefit_proof:     { en: 'Proof of current benefits (CalFresh, Medi-Cal, SSI, etc.)', es: 'Comprobante de beneficios actuales (CalFresh, Medi-Cal, SSI, etc.)', zh: '现有福利证明(CalFresh、Medi-Cal、SSI 等)' },
    child_info:        { en: "Children's documents (birth certificates, school or immunization records)", es: 'Documentos de los hijos (actas de nacimiento, registros escolares o de vacunas)', zh: '子女文件(出生证、学校或疫苗记录)' },
    birth_certificate: { en: 'Birth certificate', es: 'Acta de nacimiento', zh: '出生证明' },
    marriage_certificate: { en: 'Marriage certificate (for spouse or dependent benefits)', es: 'Acta de matrimonio (para beneficios de cónyuge o dependiente)', zh: '结婚证(用于配偶/受抚养人福利)' }
  },

  categories: {
    healthcare:     { es: 'Salud', zh: '医疗' },
    food:           { es: 'Asistencia alimentaria', zh: '食物援助' },
    cash:           { es: 'Asistencia económica', zh: '现金援助' },
    housing:        { es: 'Vivienda', zh: '住房' },
    utilities:      { es: 'Servicios e internet', zh: '水电与网络' },
    seniors:        { es: 'Adultos mayores y discapacidad', zh: '长者与残障' },
    childcare:      { es: 'Cuidado infantil', zh: '儿童看护' },
    education:      { es: 'Educación', zh: '教育' },
    disability:     { es: 'Discapacidad y licencias', zh: '残障与休假' },
    transportation: { es: 'Transporte', zh: '交通' },
    tax:            { es: 'Créditos fiscales', zh: '税收抵免' },
    veterans:       { es: 'Veteranos', zh: '退伍军人' },
    immigrants:     { es: 'Inmigrantes y refugiados', zh: '移民与难民' },
    employment:     { es: 'Empleo y capacitación', zh: '就业与培训' },
    other:          { es: 'Otros recursos', zh: '其他资源' }
  },

  // Question text + option labels. Only options with translatable words are
  // listed; purely numeric labels (e.g. "$500 - $1,000", "2") fall back to the
  // English label, which is language-neutral. y/n reuse YN below.
  questions: {
    state: { text: { es: '¿En qué estado vives?', zh: '你住在哪个州?' },
      options: { CA: { es: 'California', zh: '加州' }, other: { es: 'Otro estado', zh: '其他州' } } },
    age: { text: { es: '¿Qué edad tienes?', zh: '你多大年纪?' },
      options: { under18: { es: 'Menor de 18', zh: '18 岁以下' }, '65plus': { es: '65 o más', zh: '65 岁及以上' } } },
    household_size: { text: { es: '¿Cuántas personas viven en tu hogar (incluyéndote)?', zh: '家里共有几口人(含你自己)?' },
      options: { '1': { es: '1 (solo yo)', zh: '1(只有我)' }, '8plus': { es: '8 o más', zh: '8 人或以上' } } },
    monthly_income: { text: { es: '¿Cuál es el ingreso mensual total de tu hogar (antes de impuestos)?', zh: '家庭税前月总收入是多少?' },
      options: { '0': { es: '$0 (sin ingresos)', zh: '$0(无收入)' }, '250': { es: 'Menos de $500', zh: '低于 $500' }, '10000': { es: 'Más de $8,000', zh: '超过 $8,000' } } },
    citizenship: { text: { es: '¿Cuál es tu estatus migratorio?', zh: '你的移民身份是?' },
      options: {
        citizen: { es: 'Ciudadano de EE. UU.', zh: '美国公民' },
        green_card: { es: 'Tarjeta verde (residente permanente)', zh: '绿卡(永久居民)' },
        refugee: { es: 'Refugiado o asilado', zh: '难民或庇护者' },
        qualified_immigrant: { es: 'Otro inmigrante calificado', zh: '其他合格移民' },
        undocumented: { es: 'Indocumentado', zh: '无证件' },
        other_visa: { es: 'Otra visa (trabajo, estudiante, etc.)', zh: '其他签证(工作、学生等)' } } },
    has_children: { text: { es: '¿Tienes hijos menores de 18 en tu hogar?', zh: '家里有 18 岁以下的孩子吗?' } },
    children_ages: { text: { es: '¿Qué edades tienen tus hijos?', zh: '孩子们的年龄是?' },
      options: {
        under1: { es: 'Menos de 1 año', zh: '1 岁以下' },
        '1-4': { es: '1-4 años', zh: '1–4 岁' },
        '5-12': { es: '5-12 años (edad escolar)', zh: '5–12 岁(学龄)' },
        '13-17': { es: '13-17 años', zh: '13–17 岁' } } },
    pregnant: { text: { es: '¿Estás tú o alguien en tu hogar embarazada actualmente?', zh: '你或家里有人目前怀孕吗?' } },
    employment: { text: { es: '¿Cuál es tu situación laboral actual?', zh: '你目前的就业状况?' },
      options: {
        employed: { es: 'Empleado (tiempo completo o parcial)', zh: '在职(全职或兼职)' },
        self_employed: { es: 'Trabajador por cuenta propia', zh: '自雇' },
        student_working: { es: 'Estudiante con trabajo de medio tiempo', zh: '学生且有兼职' },
        student: { es: 'Estudiante (sin trabajar)', zh: '学生(未工作)' },
        unemployed: { es: 'Desempleado, buscando trabajo', zh: '失业,正在找工作' },
        disabled: { es: 'No puede trabajar (discapacidad)', zh: '无法工作(残障)' },
        retired: { es: 'Jubilado', zh: '已退休' },
        caregiver: { es: 'Cuidador / padre o madre en casa', zh: '照护者 / 全职家长' } } },
    recently_lost_job: { text: { es: '¿Perdiste tu empleo en los últimos 12 meses?', zh: '过去 12 个月内你失业了吗?' },
      options: { yes: { es: 'Sí', zh: '是' }, no: { es: 'No, desempleado por más tiempo', zh: '不是,失业更久了' } } },
    is_veteran: { text: { es: '¿Eres tú o alguien en tu hogar veterano militar de EE. UU.?', zh: '你或家人是美国退伍军人吗?' } },
    has_disability: { text: { es: '¿Tienes tú o alguien en tu hogar una discapacidad?', zh: '你或家人有残障吗?' } },
    has_chronic_condition: { text: { es: '¿Tienes alguna enfermedad crónica? (diabetes, enfermedad cardíaca, etc.)', zh: '你有慢性病吗?(糖尿病、心脏病等)' } },
    health_insurance: { text: { es: '¿Tienes seguro médico actualmente?', zh: '你目前有医疗保险吗?' },
      options: {
        none: { es: 'Sin seguro', zh: '没有保险' },
        employer: { es: 'Seguro del empleador', zh: '雇主保险' },
        other: { es: 'Otro seguro', zh: '其他保险' } } },
    housing: { text: { es: '¿Cuál es tu situación de vivienda actual?', zh: '你目前的居住情况?' },
      options: {
        rent: { es: 'Alquilando', zh: '租房' },
        own: { es: 'Casa propia', zh: '自有住房' },
        living_with: { es: 'Viviendo con familia/amigos', zh: '与家人/朋友同住' },
        homeless: { es: 'Sin hogar o en riesgo', zh: '无家可归或有风险' },
        shelter: { es: 'Refugio o vivienda de transición', zh: '收容所或过渡性住房' },
        rural: { es: 'Alquilar/tener vivienda en zona rural', zh: '在农村地区租房/自有' } } },
    needs_help: { text: { es: '¿Con qué necesitas ayuda? (Elige todas las que apliquen)', zh: '你需要哪方面的帮助?(可多选)' },
      options: {
        healthcare: { es: 'Seguro médico o atención médica', zh: '医疗保险或就医' },
        food: { es: 'Comida y alimentos', zh: '食物与日用品' },
        rent: { es: 'Alquiler o vivienda', zh: '房租或住房' },
        utilities: { es: 'Servicios (luz, gas, internet)', zh: '水电燃气 / 网络账单' },
        cash: { es: 'Dinero para lo básico', zh: '基本生活现金' },
        childcare: { es: 'Cuidado infantil', zh: '儿童看护' },
        education: { es: 'Educación / universidad', zh: '教育 / 大学' },
        senior_care: { es: 'Cuidado de mayores / ayuda en casa', zh: '长者照护 / 居家帮助' },
        job: { es: 'Capacitación o empleo', zh: '职业培训或就业' },
        legal: { es: 'Ayuda legal', zh: '法律帮助' } } },

    exact_annual_income: { text: { es: '¿Cuál es el ingreso anual exacto de tu hogar? (Revisa tu declaración de impuestos o recibos de pago)', zh: '家庭确切年收入是多少?(可查报税表或工资单)' },
      options: { '5000': { es: 'Menos de $10,000', zh: '低于 $10,000' }, '225000': { es: 'Más de $200,000', zh: '超过 $200,000' } } },
    total_assets: { text: { es: '¿Cuál es el valor total de tus ahorros, inversiones y propiedades? (Sin contar tu vivienda principal y un auto)', zh: '你的存款、投资和财产总值是多少?(不含主要住房和一辆车)' },
      options: { '0': { es: 'Menos de $2,000', zh: '低于 $2,000' }, '100000': { es: 'Más de $100,000', zh: '超过 $100,000' } } },
    immigration_years: { text: { es: 'Si eres inmigrante, ¿cuánto tiempo llevas en EE. UU.?', zh: '如果你是移民,你在美国多久了?' },
      options: {
        under1: { es: 'Menos de 1 año', zh: '不到 1 年' },
        '1-5': { es: '1-5 años', zh: '1–5 年' },
        '5-7': { es: '5-7 años', zh: '5–7 年' },
        '7plus': { es: 'Más de 7 años', zh: '7 年以上' } } },
    refugee_arrival: { text: { es: 'Si eres refugiado/asilado, ¿llegaste en los últimos 8 meses?', zh: '如果你是难民/庇护者,你是在过去 8 个月内到达的吗?' },
      options: { yes: { es: 'Sí, en los últimos 8 meses', zh: '是,8 个月内' }, no: { es: 'No, hace más de 8 meses', zh: '不是,超过 8 个月' } } },
    disability_type: { text: { es: '¿Qué tipo de discapacidad? (Elige todas las que apliquen)', zh: '属于哪类残障?(可多选)' },
      options: {
        physical: { es: 'Física / movilidad', zh: '身体 / 行动' },
        visual: { es: 'Ceguera o baja visión', zh: '失明或弱视' },
        hearing: { es: 'Sordera o dificultad auditiva', zh: '失聪或听力障碍' },
        cognitive: { es: 'Cognitiva / intelectual', zh: '认知 / 智力' },
        mental: { es: 'Salud mental', zh: '精神健康状况' },
        chronic: { es: 'Enfermedad crónica', zh: '慢性疾病' } } },
    receives_ssi_ssdi: { text: { es: '¿Recibes actualmente SSI o SSDI?', zh: '你目前领取 SSI 或 SSDI 吗?' },
      options: {
        ssi: { es: 'Sí, SSI', zh: '是,SSI' },
        ssdi: { es: 'Sí, SSDI', zh: '是,SSDI' },
        both: { es: 'Sí, ambos', zh: '两者都有' },
        applied: { es: 'Solicité, esperando decisión', zh: '已申请,等待结果' },
        no: { es: 'No', zh: '否' } } },
    veteran_service: { text: { es: 'Detalles del veterano:', zh: '退伍军人情况:' },
      options: {
        wartime: { es: 'Sirvió en tiempo de guerra', zh: '战时服役' },
        service_disabled: { es: 'Discapacidad por el servicio', zh: '服役相关残障' },
        honorable: { es: 'Baja honorable', zh: '荣誉退伍' },
        va_enrolled: { es: 'Ya inscrito en salud del VA', zh: '已加入 VA 医疗' },
        combat: { es: 'Sirvió en zona de combate', zh: '曾在战区服役' } } },
    veteran_dependent: { text: { es: '¿Eres cónyuge, hijo o dependiente de un veterano fallecido o con discapacidad?', zh: '你是已故或残障退伍军人的配偶、子女或受抚养人吗?' } },
    housing_crisis: { text: { es: '¿Enfrentas algún problema de vivienda?', zh: '你是否面临住房问题?' },
      options: {
        behind_rent: { es: 'Atrasado en el alquiler', zh: '拖欠房租' },
        eviction: { es: 'Enfrentando desalojo', zh: '面临驱逐' },
        utility_shutoff: { es: 'Aviso de corte de servicios', zh: '收到停水电通知' },
        overcrowded: { es: 'Vivienda sobrepoblada', zh: '住房过度拥挤' },
        unsafe: { es: 'Condiciones inseguras', zh: '居住环境不安全' },
        none: { es: 'Ninguno de estos', zh: '以上都没有' } } },
    rent_amount: { text: { es: '¿Cuánto es tu alquiler mensual?', zh: '你每月房租是多少?' },
      options: { '500': { es: 'Menos de $500', zh: '低于 $500' }, '4000': { es: 'Más de $3,000', zh: '超过 $3,000' } } },
    medical_equipment: { text: { es: '¿Alguien en tu hogar depende de equipo médico que usa electricidad? (oxígeno, diálisis, etc.)', zh: '家里有人依赖用电的医疗设备吗?(氧气机、透析等)' } },
    care_facility: { text: { es: '¿Alguien vive en un asilo, residencia asistida o centro de cuidado?', zh: '家里有人住在养老院、协助生活或护理机构吗?' },
      options: { yes: { es: 'Sí', zh: '是' }, considering: { es: 'Considerándolo', zh: '正在考虑' }, no: { es: 'No', zh: '否' } } },
    needs_daily_help: { text: { es: '¿Alguien necesita ayuda con actividades diarias? (bañarse, vestirse, cocinar, etc.)', zh: '家里有人需要日常活动帮助吗?(洗澡、穿衣、做饭等)' } },
    student_details: { text: { es: 'Detalles del estudiante:', zh: '学生情况:' },
      options: {
        community_college: { es: 'Asiste a un colegio comunitario', zh: '就读社区大学' },
        csu: { es: 'Asiste a CSU', zh: '就读 CSU' },
        uc: { es: 'Asiste a UC', zh: '就读 UC' },
        private: { es: 'Asiste a universidad privada', zh: '就读私立大学' },
        first_gen: { es: 'Estudiante universitario de primera generación', zh: '家中第一代大学生' },
        half_time: { es: 'Inscrito al menos medio tiempo', zh: '至少半日制在读' } } },
    receives_calfresh: { text: { es: '¿Recibes actualmente CalFresh (cupones de alimentos)?', zh: '你目前领取 CalFresh(食品券)吗?' } },
    utility_type: { text: { es: '¿Quién provee tu electricidad/gas?', zh: '谁为你供电 / 供气?' },
      options: { other: { es: 'Otro / Municipal', zh: '其他 / 市政' }, none: { es: 'Servicios incluidos en el alquiler', zh: '水电包含在房租内' } } }
  },

  // Generic yes/no used when a question has no custom option override
  yn: {
    yes: { es: 'Sí', zh: '是' },
    no: { es: 'No', zh: '否' }
  }
};

let currentLang = (function () {
  const saved = localStorage.getItem('aiduright_lang');
  if (saved && I18N.ui[saved]) return saved;
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
})();

function t(key) {
  const table = I18N.ui[currentLang] || I18N.ui.en;
  return table[key] != null ? table[key] : (I18N.ui.en[key] != null ? I18N.ui.en[key] : key);
}

function tCategory(id, fallback) {
  if (currentLang === 'en') return fallback;
  const c = I18N.categories[id];
  return (c && c[currentLang]) || fallback;
}

function tDoc(key) {
  const d = I18N.documents[key];
  return d ? (d[currentLang] || d.en) : key;
}

function tQuestionText(q) {
  if (currentLang === 'en') return q.text;
  const e = I18N.questions[q.id];
  return (e && e.text && e.text[currentLang]) || q.text;
}

function tOptionLabel(qid, value, fallbackLabel) {
  if (currentLang === 'en') return fallbackLabel;
  const e = I18N.questions[qid];
  if (e && e.options && e.options[value] && e.options[value][currentLang]) {
    return e.options[value][currentLang];
  }
  // Generic yes/no fallback
  if ((value === 'yes' || value === 'no') && I18N.yn[value]) {
    return I18N.yn[value][currentLang] || fallbackLabel;
  }
  return fallbackLabel; // numeric / language-neutral labels
}

function localizeBenefit(b) {
  if (currentLang === 'en' || !window.BENEFITS_I18N) return b;
  const tr = window.BENEFITS_I18N[b.id] && window.BENEFITS_I18N[b.id][currentLang];
  if (!tr) return b;
  return {
    ...b,
    name: tr.name || b.name,
    description: tr.description || b.description,
    howToApply: Array.isArray(tr.howToApply) && tr.howToApply.length ? tr.howToApply : b.howToApply
  };
}

// Apply translations to static [data-i18n] elements in the HTML
function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  // Reflect active language button
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const active = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });
}

function setLang(lang) {
  if (!I18N.ui[lang]) return;
  currentLang = lang;
  localStorage.setItem('aiduright_lang', lang);
  applyStaticTranslations();
  if (typeof window.rerenderScreen === 'function') window.rerenderScreen();
}

// Wire up the switcher + initial static translation once the DOM is ready
function initI18n() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  applyStaticTranslations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
