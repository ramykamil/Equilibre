export type TestCategory = "general" | "elderly" | "couple" | "stress";

export interface TestQuestion {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

export interface PsychometricTest {
  id: string;
  category: TestCategory;
  title: string;
  acronym?: string;
  description: string;
  longDescription: string;
  questions: TestQuestion[];
  durationMinutes: number;
}

export const TEST_CATEGORIES: { id: TestCategory; labelKey: string; icon: string }[] = [
  { id: "general", labelKey: "catGeneral", icon: "brain" },
  { id: "elderly", labelKey: "catElderly", icon: "heart-pulse" },
  { id: "couple", labelKey: "catCouple", icon: "heart-handshake" },
  { id: "stress", labelKey: "catStress", icon: "activity" },
];

export const ALL_TESTS: PsychometricTest[] = [
  // ════════════════════════════════════════════════════════════════
  // CATEGORY 1: TESTS PSYCHOMÉTRIQUES GÉNÉRAUX
  // ════════════════════════════════════════════════════════════════

  {
    id: "wisc",
    category: "general",
    title: "WISC — Échelle d'Intelligence de Wechsler (Enfants)",
    acronym: "WISC",
    description: "Évaluation du quotient intellectuel chez les enfants (6-16 ans).",
    longDescription: "Le WISC (Wechsler Intelligence Scale for Children) est un test standardisé qui évalue les capacités cognitives des enfants dans cinq domaines : compréhension verbale, raisonnement perceptif, mémoire de travail, vitesse de traitement et raisonnement fluide.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "L'enfant peut-il définir des mots complexes et expliquer les relations entre concepts ?",
        options: [
          { label: "Très facilement, avec précision et profondeur", value: 0 },
          { label: "Correctement, avec quelques hésitations", value: 8 },
          { label: "Difficilement, réponses partielles ou imprécises", value: 17 },
          { label: "Incapable de fournir des définitions cohérentes", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment l'enfant résout-il des problèmes de logique visuelle (puzzles, matrices) ?",
        options: [
          { label: "Résolutions rapides et précises", value: 0 },
          { label: "Solutions correctes avec un temps raisonnable", value: 8 },
          { label: "Quelques erreurs, stratégie hésitante", value: 17 },
          { label: "Incapable de résoudre sans aide significative", value: 25 },
        ],
      },
      {
        id: 3,
        text: "L'enfant peut-il retenir et manipuler des séquences de chiffres en mémoire ?",
        options: [
          { label: "Retient et inverse 6+ chiffres sans erreur", value: 0 },
          { label: "Retient 4-5 chiffres, quelques inversions réussies", value: 8 },
          { label: "Retient 2-3 chiffres, inversions difficiles", value: 17 },
          { label: "Difficulté à retenir même 2 chiffres", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Quelle est la capacité de l'enfant à reconstituer des formes géométriques à partir de blocs ?",
        options: [
          { label: "Reproduction rapide et exacte des modèles", value: 0 },
          { label: "Reproduction correcte, vitesse modérée", value: 8 },
          { label: "Erreurs fréquentes dans l'orientation spatiale", value: 17 },
          { label: "Incapable de reproduire les formes demandées", value: 25 },
        ],
      },
      {
        id: 5,
        text: "À quelle vitesse l'enfant peut-il associer des symboles à des chiffres correspondants ?",
        options: [
          { label: "Très rapide, plus de 50 associations en 2 minutes", value: 0 },
          { label: "Vitesse moyenne, 30-49 associations", value: 8 },
          { label: "Lent, moins de 30 associations", value: 17 },
          { label: "Très lent, nombreuses erreurs d'association", value: 25 },
        ],
      },
    ],
  },

  {
    id: "wais",
    category: "general",
    title: "WAIS — Échelle d'Intelligence de Wechsler (Adultes)",
    acronym: "WAIS",
    description: "Mesure du quotient intellectuel chez les adultes (16-90 ans).",
    longDescription: "Le WAIS (Wechsler Adult Intelligence Scale) est l'outil de référence pour évaluer l'intelligence adulte. Il mesure quatre indices principaux : compréhension verbale, raisonnement perceptif, mémoire de travail et vitesse de traitement.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        text: "Quel est votre niveau de culture générale (histoire, sciences, géographie) ?",
        options: [
          { label: "Excellente culture générale, réponses détaillées", value: 0 },
          { label: "Bonne culture, quelques lacunes", value: 8 },
          { label: "Connaissances limitées à certains domaines", value: 17 },
          { label: "Difficultés majeures en culture générale", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment abordez-vous la résolution de problèmes abstraits (analogies, séries logiques) ?",
        options: [
          { label: "Analyse rapide et solutions précises", value: 0 },
          { label: "Solutions correctes après réflexion", value: 8 },
          { label: "Besoin d'indices pour trouver la solution", value: 17 },
          { label: "Grande difficulté avec les problèmes abstraits", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous retenir une liste de 8-10 mots après une seule écoute ?",
        options: [
          { label: "Oui, je retiens 8+ mots facilement", value: 0 },
          { label: "Je retiens 5-7 mots en général", value: 8 },
          { label: "Je retiens 3-4 mots tout au plus", value: 17 },
          { label: "Très difficile de retenir plus de 2 mots", value: 25 },
        ],
      },
      {
        id: 4,
        text: "À quelle vitesse pouvez-vous repérer un symbole cible parmi des distracteurs similaires ?",
        options: [
          { label: "Très rapide, repérage quasi instantané", value: 0 },
          { label: "Vitesse correcte, quelques hésitations", value: 8 },
          { label: "Relativement lent, erreurs occasionnelles", value: 17 },
          { label: "Très lent avec de nombreuses erreurs", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Comment évaluez-vous votre capacité à expliquer des concepts complexes oralement ?",
        options: [
          { label: "Explications claires, structurées et complètes", value: 0 },
          { label: "Explications correctes, parfois manque de précision", value: 8 },
          { label: "Difficultés à structurer mes explications", value: 17 },
          { label: "Très difficile de verbaliser mes idées", value: 25 },
        ],
      },
    ],
  },

  {
    id: "mbti",
    category: "general",
    title: "MBTI — Indicateur Typologique de Myers-Briggs",
    acronym: "MBTI",
    description: "Test de typologie de la personnalité selon 4 dimensions.",
    longDescription: "Le MBTI (Myers-Briggs Type Indicator) est un questionnaire de personnalité qui classe les individus selon quatre dimensions : Extraversion/Introversion, Sensation/Intuition, Pensée/Sentiment et Jugement/Perception, produisant 16 types de personnalité.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Dans un groupe, comment vous ressourcez-vous le mieux ?",
        options: [
          { label: "En interagissant activement avec les autres (E)", value: 0 },
          { label: "J'aime alterner entre interactions et moments seul", value: 8 },
          { label: "Je préfère observer et intervenir ponctuellement", value: 17 },
          { label: "En me retirant dans un espace calme et personnel (I)", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment préférez-vous recevoir de l'information ?",
        options: [
          { label: "Par des faits concrets et des détails précis (S)", value: 0 },
          { label: "Un mélange de faits et de vue d'ensemble", value: 8 },
          { label: "Par des connexions entre concepts et des possibilités", value: 17 },
          { label: "Par la vision globale et les patterns cachés (N)", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment prenez-vous des décisions importantes ?",
        options: [
          { label: "Par analyse logique et objective des faits (T)", value: 0 },
          { label: "Principalement par la logique, avec sensibilité", value: 8 },
          { label: "En tenant compte de l'impact sur les personnes", value: 17 },
          { label: "En me basant sur mes valeurs et l'harmonie (F)", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment organisez-vous votre quotidien ?",
        options: [
          { label: "Planning structuré et décisions rapides (J)", value: 0 },
          { label: "Organisation flexible avec quelques plans fixes", value: 8 },
          { label: "Je m'adapte au jour le jour avec souplesse", value: 17 },
          { label: "Spontanéité totale et ouverture aux options (P)", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Face à un projet créatif, quelle approche adoptez-vous ?",
        options: [
          { label: "Méthode pas-à-pas, résultats mesurables", value: 0 },
          { label: "Un plan initial, ouvert aux ajustements", value: 8 },
          { label: "Brainstorming libre puis structuration progressive", value: 17 },
          { label: "Exploration intuitive, le processus guide le résultat", value: 25 },
        ],
      },
    ],
  },

  {
    id: "bigfive",
    category: "general",
    title: "Big Five (NEO-PI-R) — Cinq Grands Traits de Personnalité",
    acronym: "Big Five",
    description: "Évaluation selon les cinq dimensions : Ouverture, Conscience, Extraversion, Agréabilité, Neuroticisme.",
    longDescription: "Le modèle des Big Five (ou NEO-PI-R) est le modèle de personnalité le plus validé scientifiquement. Il évalue cinq traits fondamentaux : Ouverture à l'expérience, Conscienciosité, Extraversion, Agréabilité et Neuroticisme (OCEAN).",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "À quel point êtes-vous attiré par les nouvelles idées, l'art et les expériences inhabituelles ?",
        options: [
          { label: "Extrêmement curieux, je recherche constamment la nouveauté", value: 0 },
          { label: "Assez ouvert, j'apprécie découvrir de nouvelles choses", value: 8 },
          { label: "Plutôt traditionnel, je préfère ce que je connais", value: 17 },
          { label: "Je privilégie la routine et le familier", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment décririez-vous votre degré d'organisation et de discipline personnelle ?",
        options: [
          { label: "Très organisé, méthodique et fiable", value: 0 },
          { label: "Généralement organisé avec quelques oublis", value: 8 },
          { label: "Plutôt spontané, l'organisation n'est pas ma force", value: 17 },
          { label: "Très désordonné, j'agis sur l'impulsion du moment", value: 25 },
        ],
      },
      {
        id: 3,
        text: "À quel point recherchez-vous la compagnie et la stimulation sociale ?",
        options: [
          { label: "Très sociable, j'ai besoin d'interactions fréquentes", value: 0 },
          { label: "J'apprécie la socialisation modérée", value: 8 },
          { label: "Je préfère les petits groupes ou le tête-à-tête", value: 17 },
          { label: "Je suis très réservé et indépendant socialement", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment réagissez-vous face aux besoins et sentiments des autres ?",
        options: [
          { label: "Très empathique, coopératif et altruiste", value: 0 },
          { label: "Généralement compréhensif et accommodant", value: 8 },
          { label: "Plutôt indépendant dans mes positions", value: 17 },
          { label: "Compétitif et centré sur mes propres objectifs", value: 25 },
        ],
      },
      {
        id: 5,
        text: "À quelle fréquence ressentez-vous de l'anxiété, de la tristesse ou de l'irritabilité ?",
        options: [
          { label: "Très rarement, je suis émotionnellement stable", value: 0 },
          { label: "Occasionnellement, dans des situations stressantes", value: 8 },
          { label: "Assez souvent, je suis sensible au stress", value: 17 },
          { label: "Très fréquemment, l'instabilité émotionnelle est quotidienne", value: 25 },
        ],
      },
    ],
  },

  {
    id: "mmpi",
    category: "general",
    title: "MMPI — Inventaire Multiphasique de Personnalité du Minnesota",
    acronym: "MMPI",
    description: "Évaluation clinique de la personnalité et des troubles psychopathologiques.",
    longDescription: "Le MMPI (Minnesota Multiphasic Personality Inventory) est l'un des tests psychologiques les plus utilisés en milieu clinique. Il permet de détecter des tendances psychopathologiques et d'évaluer la personnalité à travers plusieurs échelles cliniques.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        text: "Ressentez-vous des douleurs physiques récurrentes sans cause médicale identifiée (maux de tête, douleurs d'estomac, fatigue) ?",
        options: [
          { label: "Jamais ou très rarement", value: 0 },
          { label: "Occasionnellement en période de stress", value: 8 },
          { label: "Régulièrement, cela affecte mon quotidien", value: 17 },
          { label: "Constamment, malgré les examens médicaux normaux", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Avez-vous tendance à vous isoler socialement et à éviter les interactions ?",
        options: [
          { label: "Non, je suis à l'aise dans les interactions sociales", value: 0 },
          { label: "Parfois je préfère être seul mais je reste sociable", value: 8 },
          { label: "Je m'isole souvent et les interactions me fatiguent", value: 17 },
          { label: "Je m'isole systématiquement, le contact social m'angoisse", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Vous arrive-t-il de penser que les gens autour de vous ont des intentions cachées ou hostiles ?",
        options: [
          { label: "Non, je fais généralement confiance aux autres", value: 0 },
          { label: "Parfois, dans certaines situations spécifiques", value: 8 },
          { label: "Assez souvent, je reste méfiant par précaution", value: 17 },
          { label: "Presque toujours, je me sens surveillé ou menacé", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Pendant les deux dernières semaines, avez-vous ressenti un sentiment persistant de tristesse ou de désespoir ?",
        options: [
          { label: "Non, mon humeur est stable et positive", value: 0 },
          { label: "Quelques moments de baisse d'humeur passagers", value: 8 },
          { label: "Oui, une tristesse fréquente qui affecte mes activités", value: 17 },
          { label: "Un désespoir intense et constant", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Avez-vous des pensées anxieuses intrusives ou des ruminations que vous ne pouvez pas contrôler ?",
        options: [
          { label: "Non, j'arrive à gérer mes pensées facilement", value: 0 },
          { label: "Parfois, mais je peux les maîtriser", value: 8 },
          { label: "Fréquemment, elles perturbent ma concentration", value: 17 },
          { label: "Constamment, elles dominent mon esprit", value: 25 },
        ],
      },
    ],
  },

  {
    id: "rorschach",
    category: "general",
    title: "Rorschach — Test Projectif des Taches d'Encre",
    acronym: "Rorschach",
    description: "Test projectif d'interprétation de taches d'encre pour explorer la personnalité profonde.",
    longDescription: "Le test de Rorschach utilise des taches d'encre symétriques comme stimuli ambigus. Les réponses du sujet révèlent des aspects de sa personnalité, ses mécanismes de défense, sa perception de la réalité et sa vie émotionnelle.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Face à une image ambiguë, comment structurez-vous typiquement votre perception ?",
        options: [
          { label: "Je vois rapidement des formes claires et organisées", value: 0 },
          { label: "Je perçois plusieurs éléments que j'organise progressivement", value: 8 },
          { label: "Les formes restent floues, je me concentre sur les détails", value: 17 },
          { label: "L'image reste confuse, j'ai du mal à former une perception cohérente", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Lorsque vous imaginez ou rêvez, quelle est la richesse de vos productions mentales ?",
        options: [
          { label: "Très riche, avec des scénarios détaillés et colorés", value: 0 },
          { label: "Modérément riche, avec des images nettes", value: 8 },
          { label: "Plutôt pauvre, images vagues et fugaces", value: 17 },
          { label: "Très limité, je visualise rarement des images mentales", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment réagissez-vous émotionnellement face à des stimuli visuels intenses (couleurs vives, scènes fortes) ?",
        options: [
          { label: "Réaction équilibrée, j'intègre les émotions sans être submergé", value: 0 },
          { label: "Réaction modérée avec un bon contrôle émotionnel", value: 8 },
          { label: "Réaction intense, parfois difficile à maîtriser", value: 17 },
          { label: "Réaction très forte ou au contraire absence totale de réaction", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Êtes-vous capable de voir des concepts abstraits (amour, liberté, justice) dans des formes visuelles ?",
        options: [
          { label: "Oui, naturellement et avec créativité", value: 0 },
          { label: "Parfois, quand le contexte s'y prête", value: 8 },
          { label: "Rarement, je reste très concret", value: 17 },
          { label: "Non, je ne vois que des formes littérales", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Quand vous interprétez une scène complexe, intégrez-vous les différents éléments en un tout cohérent ?",
        options: [
          { label: "Oui, je crée facilement une synthèse globale", value: 0 },
          { label: "Généralement oui, avec quelques difficultés", value: 8 },
          { label: "J'ai tendance à me focaliser sur des détails isolés", value: 17 },
          { label: "Non, les éléments restent fragmentés et déconnectés", value: 25 },
        ],
      },
    ],
  },

  {
    id: "tat",
    category: "general",
    title: "TAT — Test d'Aperception Thématique",
    acronym: "TAT",
    description: "Test projectif basé sur la création d'histoires à partir d'images.",
    longDescription: "Le TAT (Thematic Apperception Test) demande au sujet de créer des histoires à partir d'images ambiguës représentant des situations sociales. Il révèle les besoins, les conflits internes, les dynamiques relationnelles et les mécanismes de défense.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Lorsqu'on vous montre une image de situation sociale, construisez-vous facilement une histoire cohérente avec un début, un milieu et une fin ?",
        options: [
          { label: "Oui, spontanément avec richesse de détails", value: 0 },
          { label: "Oui, après un moment de réflexion", value: 8 },
          { label: "Difficilement, l'histoire reste fragmentaire", value: 17 },
          { label: "Non, je décris seulement ce que je vois sans narration", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Dans vos histoires imaginées, les personnages expriment-ils des émotions claires et variées ?",
        options: [
          { label: "Oui, avec nuance et profondeur émotionnelle", value: 0 },
          { label: "Les émotions sont présentes mais basiques", value: 8 },
          { label: "Peu d'émotions exprimées, récit plutôt factuel", value: 17 },
          { label: "Absence quasi totale de contenu émotionnel", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Identifiez-vous facilement des tensions ou des conflits dans des scènes interpersonnelles ?",
        options: [
          { label: "Oui, je perçois les sous-entendus et les conflits latents", value: 0 },
          { label: "Je perçois les conflits évidents", value: 8 },
          { label: "Je perçois parfois des tensions mais de manière vague", value: 17 },
          { label: "Je ne perçois pas de conflit dans les interactions", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Quand vous imaginez des relations entre personnes, comment sont-elles caractérisées ?",
        options: [
          { label: "Variées : coopération, compétition, affection, conflit", value: 0 },
          { label: "Principalement positives avec quelques tensions", value: 8 },
          { label: "Souvent conflictuelles ou distantes", value: 17 },
          { label: "Très stéréotypées ou absentes", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Votre vision de vous-même dans les situations sociales est-elle plutôt ?",
        options: [
          { label: "Positive et réaliste, avec confiance en mes capacités", value: 0 },
          { label: "Globalement positive, avec quelques doutes", value: 8 },
          { label: "Souvent négative, avec un sentiment d'inadéquation", value: 17 },
          { label: "Très négative, je me perçois comme un étranger dans les groupes", value: 25 },
        ],
      },
    ],
  },

  {
    id: "stroop",
    category: "general",
    title: "Test de Stroop — Flexibilité Cognitive",
    acronym: "Stroop",
    description: "Mesure de la flexibilité cognitive et du contrôle inhibiteur.",
    longDescription: "Le test de Stroop mesure la capacité à inhiber une réponse automatique (lire un mot) pour produire une réponse contrôlée (nommer la couleur). Il évalue l'attention sélective, la flexibilité cognitive et le contrôle exécutif.",
    durationMinutes: 6,
    questions: [
      {
        id: 1,
        text: "Lorsque vous devez ignorer une information automatique (par ex. lire un mot) pour vous concentrer sur un autre aspect (par ex. sa couleur), comment cela se passe-t-il ?",
        options: [
          { label: "Très facile, je bloque l'information parasite rapidement", value: 0 },
          { label: "Possible mais nécessite un effort conscient", value: 8 },
          { label: "Difficile, je fais souvent des erreurs d'automatisme", value: 17 },
          { label: "Très difficile, l'information automatique s'impose", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Sous pression temporelle, maintenez-vous la même précision dans les tâches qui demandent de l'attention ?",
        options: [
          { label: "Oui, ma performance reste stable", value: 0 },
          { label: "Légère baisse de précision mais acceptable", value: 8 },
          { label: "Baisse notable, j'accélère au détriment de la précision", value: 17 },
          { label: "Performance très dégradée sous pression", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous vous concentrer sur une tâche unique quand plusieurs stimuli réclament votre attention ?",
        options: [
          { label: "Oui, je filtre très bien les distractions", value: 0 },
          { label: "Généralement oui, avec un effort modéré", value: 8 },
          { label: "J'ai du mal, je suis souvent distrait", value: 17 },
          { label: "Non, les distractions captent toujours mon attention", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Lorsque les règles d'une tâche changent soudainement, comment vous adaptez-vous ?",
        options: [
          { label: "Transition fluide et rapide", value: 0 },
          { label: "Adaptation après quelques essais", value: 8 },
          { label: "Plusieurs erreurs avant adaptation", value: 17 },
          { label: "Grande difficulté à changer de stratégie", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Ressentez-vous un coût cognitif important quand vous devez alterner entre deux types de tâches ?",
        options: [
          { label: "Non, l'alternance est fluide et naturelle", value: 0 },
          { label: "Un léger ralentissement lors du changement", value: 8 },
          { label: "Un ralentissement notable avec quelques erreurs", value: 17 },
          { label: "Oui, l'alternance est très coûteuse et source d'erreurs", value: 25 },
        ],
      },
    ],
  },

  {
    id: "msceit",
    category: "general",
    title: "MSCEIT — Test d'Intelligence Émotionnelle",
    acronym: "MSCEIT",
    description: "Évaluation de l'intelligence émotionnelle : percevoir, comprendre et gérer les émotions.",
    longDescription: "Le MSCEIT (Mayer-Salovey-Caruso Emotional Intelligence Test) mesure quatre branches de l'intelligence émotionnelle : percevoir les émotions, utiliser les émotions pour faciliter la pensée, comprendre les émotions et gérer les émotions.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Pouvez-vous identifier avec précision les émotions des autres à partir de leurs expressions faciales et de leur langage corporel ?",
        options: [
          { label: "Oui, très précisément, même les émotions subtiles", value: 0 },
          { label: "Correctement pour les émotions évidentes", value: 8 },
          { label: "Difficilement, je me trompe souvent", value: 17 },
          { label: "Non, je suis très peu sensible aux indices émotionnels", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Utilisez-vous vos émotions pour guider votre réflexion et votre créativité ?",
        options: [
          { label: "Oui, mes émotions enrichissent ma pensée", value: 0 },
          { label: "Parfois, quand j'en suis conscient", value: 8 },
          { label: "Rarement, j'essaie de séparer émotion et raison", value: 17 },
          { label: "Mes émotions perturbent plutôt ma réflexion", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comprenez-vous comment les émotions évoluent et se combinent (ex. la déception menant à la colère) ?",
        options: [
          { label: "Oui, avec finesse et nuance", value: 0 },
          { label: "Pour les progressions émotionnelles simples", value: 8 },
          { label: "J'ai du mal à comprendre les mélanges d'émotions", value: 17 },
          { label: "Non, les émotions complexes m'échappent complètement", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Quand vous ressentez une émotion intense (colère, tristesse), arrivez-vous à la réguler de manière constructive ?",
        options: [
          { label: "Oui, j'ai des stratégies efficaces de régulation", value: 0 },
          { label: "Généralement oui, après un temps d'adaptation", value: 8 },
          { label: "Difficilement, l'émotion m'envahit souvent", value: 17 },
          { label: "Non, je suis submergé ou je la refoule complètement", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Êtes-vous capable de ressentir ce que l'autre vit sans vous laisser envahir par ses émotions ?",
        options: [
          { label: "Oui, empathie équilibrée sans fusion émotionnelle", value: 0 },
          { label: "Généralement oui, avec quelques débordements", value: 8 },
          { label: "Je suis souvent submergé par les émotions des autres", value: 17 },
          { label: "Non, soit je suis indifférent soit totalement envahi", value: 25 },
        ],
      },
    ],
  },

  {
    id: "depistage-troubles",
    category: "general",
    title: "Dépistage Troubles Spécifiques — Dyslexie & Dyscalculie",
    acronym: "Dépistage",
    description: "Évaluation des troubles spécifiques d'apprentissage (dyslexie, dyscalculie).",
    longDescription: "Ce test de dépistage évalue les indicateurs précoces de troubles spécifiques d'apprentissage comme la dyslexie (trouble de la lecture) et la dyscalculie (trouble du calcul), en examinant les compétences phonologiques, numériques et visuo-spatiales.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Avez-vous des difficultés à lire à voix haute de manière fluide (inversions de lettres, sauts de ligne, lenteur) ?",
        options: [
          { label: "Aucune difficulté, lecture fluide et rapide", value: 0 },
          { label: "Difficultés occasionnelles avec certains mots", value: 8 },
          { label: "Difficultés fréquentes, lecture hésitante", value: 17 },
          { label: "Très grandes difficultés, lecture très laborieuse", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment vous sentez-vous face aux calculs mentaux simples (additions, soustractions, tables de multiplication) ?",
        options: [
          { label: "À l'aise, calculs rapides et précis", value: 0 },
          { label: "Correct mais nécessite de la concentration", value: 8 },
          { label: "Difficile, je fais souvent des erreurs", value: 17 },
          { label: "Très difficile, j'évite les calculs mentaux", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous facilement découper des mots en syllabes et identifier les sons qui les composent ?",
        options: [
          { label: "Oui, très facilement et rapidement", value: 0 },
          { label: "Correctement pour les mots courants", value: 8 },
          { label: "Difficilement, surtout pour les mots longs ou inconnus", value: 17 },
          { label: "Non, la segmentation phonologique est très difficile", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Avez-vous des difficultés à vous repérer dans l'espace (gauche/droite, lecture de plans) ?",
        options: [
          { label: "Aucune difficulté, bon sens de l'orientation", value: 0 },
          { label: "Quelques hésitations occasionnelles", value: 8 },
          { label: "Confusions fréquentes gauche/droite ou nord/sud", value: 17 },
          { label: "Très grandes difficultés d'orientation spatiale", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Votre mémoire de travail (retenir une information tout en effectuant une autre tâche) est-elle fiable ?",
        options: [
          { label: "Oui, très fiable même en multitâche", value: 0 },
          { label: "Correcte pour des informations simples", value: 8 },
          { label: "Fragile, j'oublie souvent l'information initiale", value: 17 },
          { label: "Très fragile, je perds rapidement le fil", value: 25 },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CATEGORY 2: TESTS PERSONNES ÂGÉES / COGNITIFS
  // ════════════════════════════════════════════════════════════════

  {
    id: "mmse",
    category: "elderly",
    title: "MMSE — Mini-Mental State Examination",
    acronym: "MMSE",
    description: "Dépistage des troubles cognitifs légers à modérés chez les personnes âgées.",
    longDescription: "Le MMSE évalue l'orientation temporelle et spatiale, la mémoire immédiate et différée, le calcul, le langage et les capacités visuoconstructives. C'est l'outil de dépistage cognitif le plus utilisé en gériatrie.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Pouvez-vous indiquer sans hésitation la date complète (jour, mois, année) et le lieu exact où vous vous trouvez ?",
        options: [
          { label: "Oui, toutes les informations sont correctes et précises", value: 0 },
          { label: "Quelques hésitations mineures (ex. date du jour)", value: 8 },
          { label: "Erreurs sur 2-3 éléments (mois, lieu précis)", value: 17 },
          { label: "Désorienté dans le temps et/ou dans l'espace", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Après qu'on vous ait énuméré 3 mots, pouvez-vous les répéter immédiatement puis les rappeler après 5 minutes ?",
        options: [
          { label: "Les 3 mots rappelés immédiatement et après 5 minutes", value: 0 },
          { label: "3 mots immédiats, 2 rappelés après 5 minutes", value: 8 },
          { label: "Rappel immédiat partiel, 1 mot après 5 minutes", value: 17 },
          { label: "Incapable de rappeler les mots après le délai", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous compter à rebours de 7 en 7 à partir de 100 (100, 93, 86...) ?",
        options: [
          { label: "Oui, sans erreur et avec fluidité", value: 0 },
          { label: "1-2 erreurs corrigées spontanément", value: 8 },
          { label: "3+ erreurs, calcul laborieux", value: 17 },
          { label: "Incapable de réaliser l'exercice", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Pouvez-vous nommer correctement des objets courants, répéter une phrase complexe et suivre une instruction en trois étapes ?",
        options: [
          { label: "Oui, sans aucune difficulté", value: 0 },
          { label: "Quelques hésitations ou reformulations nécessaires", value: 8 },
          { label: "Erreurs de dénomination ou incapacité à suivre les 3 étapes", value: 17 },
          { label: "Difficultés majeures de langage et de compréhension", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Pouvez-vous recopier un dessin géométrique complexe (deux pentagones qui se croisent) ?",
        options: [
          { label: "Copie fidèle avec tous les angles et l'intersection", value: 0 },
          { label: "Copie globalement correcte, légères imprécisions", value: 8 },
          { label: "Formes reconnaissables mais déformées", value: 17 },
          { label: "Copie méconnaissable ou refus de l'exercice", value: 25 },
        ],
      },
    ],
  },

  {
    id: "moca",
    category: "elderly",
    title: "MoCA — Montreal Cognitive Assessment",
    acronym: "MoCA",
    description: "Plus sensible que le MMSE pour détecter les déficits cognitifs légers.",
    longDescription: "Le MoCA évalue plusieurs domaines cognitifs : mémoire à court terme, capacités visuospatiales, fonctions exécutives, attention, langage et orientation. Il est particulièrement sensible pour détecter les troubles cognitifs légers (MCI).",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Après avoir entendu une liste de 5 mots, combien pouvez-vous en rappeler après 5 minutes sans indice ?",
        options: [
          { label: "Les 5 mots sans aucune aide", value: 0 },
          { label: "3-4 mots sans aide", value: 8 },
          { label: "1-2 mots sans aide, d'autres avec indices", value: 17 },
          { label: "Aucun mot sans aide, même avec indices c'est difficile", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Pouvez-vous dessiner un cube en 3D et reproduire les aiguilles d'une horloge à une heure donnée ?",
        options: [
          { label: "Oui, dessins corrects avec perspective et proportions", value: 0 },
          { label: "Globalement correct avec quelques erreurs mineures", value: 8 },
          { label: "Erreurs significatives dans les proportions ou la perspective", value: 17 },
          { label: "Incapable de reproduire les dessins de manière reconnaissable", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous réaliser une séquence alternée (ex. 1-A-2-B-3-C) rapidement et sans erreur ?",
        options: [
          { label: "Oui, sans erreur et rapidement", value: 0 },
          { label: "Avec 1-2 erreurs corrigées spontanément", value: 8 },
          { label: "Plusieurs erreurs, séquence difficile à maintenir", value: 17 },
          { label: "Incapable de réaliser l'alternance", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Pouvez-vous nommer correctement des animaux moins courants (rhinocéros, dromadaire) à partir d'images ?",
        options: [
          { label: "Oui, dénomination rapide et correcte", value: 0 },
          { label: "Correct après quelques secondes de réflexion", value: 8 },
          { label: "Erreurs de dénomination ou utilisation de périphrases", value: 17 },
          { label: "Incapable de nommer même avec des indices", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Pouvez-vous identifier les similitudes entre deux concepts (ex. train et vélo = moyens de transport) ?",
        options: [
          { label: "Oui, identification abstraite immédiate", value: 0 },
          { label: "Correct mais de manière concrète plutôt qu'abstraite", value: 8 },
          { label: "Difficulté à trouver le point commun", value: 17 },
          { label: "Incapable d'identifier les similitudes", value: 25 },
        ],
      },
    ],
  },

  {
    id: "clock-drawing",
    category: "elderly",
    title: "Test de l'Horloge — Clock Drawing Test",
    acronym: "CDT",
    description: "Évaluation rapide des fonctions exécutives et de la perception spatiale.",
    longDescription: "Le test de l'horloge (Clock Drawing Test) est un outil simple et rapide qui évalue les fonctions exécutives, la planification, la perception visuospatiale et la mémoire sémantique. Il est particulièrement utile pour le dépistage de la démence.",
    durationMinutes: 5,
    questions: [
      {
        id: 1,
        text: "Pouvez-vous placer correctement les 12 chiffres d'une horloge dans un cercle de manière équidistante ?",
        options: [
          { label: "Oui, tous les chiffres bien placés et espacés", value: 0 },
          { label: "Globalement correct, légers décalages", value: 8 },
          { label: "Chiffres regroupés ou mal distribués dans l'espace", value: 17 },
          { label: "Placement très désorganisé ou chiffres manquants", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Pouvez-vous positionner correctement les aiguilles pour indiquer « 11 heures 10 » ?",
        options: [
          { label: "Les deux aiguilles sont bien placées avec la bonne longueur", value: 0 },
          { label: "Position globalement correcte, taille des aiguilles imprécise", value: 8 },
          { label: "Une seule aiguille correcte ou erreur d'attraction (10 au lieu de 2)", value: 17 },
          { label: "Incapable de placer les aiguilles correctement", value: 25 },
        ],
      },
      {
        id: 3,
        text: "L'organisation spatiale de votre dessin est-elle symétrique et bien proportionnée ?",
        options: [
          { label: "Oui, cercle régulier et proportions harmonieuses", value: 0 },
          { label: "Globalement correct avec quelques asymétries", value: 8 },
          { label: "Asymétrie marquée ou forme du cadran déformée", value: 17 },
          { label: "Désorganisation spatiale importante", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Avez-vous besoin de planifier et d'organiser mentalement le dessin avant de commencer ?",
        options: [
          { label: "Le dessin est spontané et bien organisé", value: 0 },
          { label: "Je planifie brièvement et le résultat est correct", value: 8 },
          { label: "J'ai besoin de temps mais le résultat reste imparfait", value: 17 },
          { label: "Je commence sans plan et le résultat est confus", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Comment évaluez-vous votre perception visuelle des formes géométriques et de la symétrie ?",
        options: [
          { label: "Excellente perception visuelle et sens de la symétrie", value: 0 },
          { label: "Bonne perception avec quelques difficultés", value: 8 },
          { label: "Difficultés fréquentes avec les formes et la symétrie", value: 17 },
          { label: "Très faible perception visuospatiale", value: 25 },
        ],
      },
    ],
  },

  {
    id: "gds-reisberg",
    category: "elderly",
    title: "GDS de Reisberg — Échelle Globale de Détérioration",
    acronym: "GDS",
    description: "Classification du degré de déclin cognitif global, notamment dans la démence.",
    longDescription: "L'Échelle de Détérioration Globale de Reisberg (GDS) classe le déclin cognitif en 7 stades, allant du fonctionnement normal à la démence très sévère. Elle est utilisée pour suivre la progression du déclin et adapter les soins.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Comment se déroulent les activités quotidiennes habituelles (courses, cuisine, gestion du foyer) ?",
        options: [
          { label: "Sans aucune difficulté, de manière autonome", value: 0 },
          { label: "Quelques oublis mineurs mais autonomie préservée", value: 8 },
          { label: "Besoin d'aide pour certaines tâches complexes", value: 17 },
          { label: "Besoin d'aide pour la plupart des activités quotidiennes", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Remarquez-vous (ou votre entourage remarque-t-il) des problèmes de mémoire au quotidien ?",
        options: [
          { label: "Non, aucune plainte de mémoire", value: 0 },
          { label: "Plaintes subjectives (oubli de noms, d'objets) sans impact", value: 8 },
          { label: "Oublis visibles par l'entourage, impact sur les activités", value: 17 },
          { label: "Oublis importants affectant le quotidien et la sécurité", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous vous orienter dans des lieux familiers et vous souvenir de la date du jour ?",
        options: [
          { label: "Oui, orientation parfaite dans le temps et l'espace", value: 0 },
          { label: "Quelques hésitations occasionnelles sur la date", value: 8 },
          { label: "Désorientation fréquente, même dans les lieux connus", value: 17 },
          { label: "Désorientation constante, confusion sur le temps et le lieu", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment gérez-vous votre hygiène personnelle et votre habillage ?",
        options: [
          { label: "De manière totalement autonome et appropriée", value: 0 },
          { label: "Autonome mais avec rappels occasionnels nécessaires", value: 8 },
          { label: "Besoin d'aide régulière pour choisir les vêtements ou se laver", value: 17 },
          { label: "Dépendance totale pour l'hygiène et l'habillage", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Reconnaissez-vous toujours les membres de votre famille et vos proches ?",
        options: [
          { label: "Oui, sans aucune difficulté", value: 0 },
          { label: "Oui, mais parfois besoin d'un moment pour situer le lien", value: 8 },
          { label: "Confusion occasionnelle entre certains proches", value: 17 },
          { label: "Difficulté à reconnaître même les proches immédiats", value: 25 },
        ],
      },
    ],
  },

  {
    id: "ravlt",
    category: "elderly",
    title: "RAVLT — Test d'Apprentissage Verbal de Rey",
    acronym: "RAVLT",
    description: "Évaluation de la mémoire verbale à court et long terme.",
    longDescription: "Le RAVLT (Rey Auditory Verbal Learning Test) évalue la mémoire verbale immédiate, la capacité d'apprentissage sur plusieurs essais, la sensibilité à l'interférence, le rappel différé et la reconnaissance. C'est un outil clé en neuropsychologie.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Combien de mots pouvez-vous retenir après une seule présentation d'une liste de 15 mots ?",
        options: [
          { label: "7 mots ou plus", value: 0 },
          { label: "5-6 mots", value: 8 },
          { label: "3-4 mots", value: 17 },
          { label: "Moins de 3 mots", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Après 5 présentations successives de la même liste, votre score s'améliore-t-il significativement ?",
        options: [
          { label: "Oui, progression constante jusqu'à 12-15 mots", value: 0 },
          { label: "Amélioration modérée, plafond autour de 9-11 mots", value: 8 },
          { label: "Faible amélioration, plateau rapide sous 8 mots", value: 17 },
          { label: "Peu ou pas d'amélioration entre les essais", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Si on vous présente une deuxième liste de mots, cela perturbe-t-il le rappel de la première ?",
        options: [
          { label: "Non, je garde bien les deux listes séparées", value: 0 },
          { label: "Légère interférence, 1-2 confusions", value: 8 },
          { label: "Interférence notable, beaucoup de confusions", value: 17 },
          { label: "La deuxième liste efface presque la première", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Après 20 minutes d'activité différente, combien de mots de la liste initiale rappelez-vous ?",
        options: [
          { label: "10 mots ou plus", value: 0 },
          { label: "7-9 mots", value: 8 },
          { label: "4-6 mots", value: 17 },
          { label: "Moins de 4 mots ou aucun", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Parmi une grande liste contenant les mots appris et des intrus, identifiez-vous correctement les vrais mots ?",
        options: [
          { label: "Oui, reconnaissance quasi parfaite sans faux positifs", value: 0 },
          { label: "Bonne reconnaissance avec quelques faux positifs", value: 8 },
          { label: "Reconnaissance partielle avec beaucoup de faux positifs", value: 17 },
          { label: "Incapable de distinguer les mots appris des intrus", value: 25 },
        ],
      },
    ],
  },

  {
    id: "stroop-elderly",
    category: "elderly",
    title: "Test de Stroop (Adapté Personnes Âgées)",
    acronym: "Stroop PA",
    description: "Version adaptée du test de Stroop pour évaluer la flexibilité cognitive des seniors.",
    longDescription: "Cette version adaptée du test de Stroop tient compte du ralentissement cognitif normal lié à l'âge. Elle évalue l'attention sélective, le contrôle inhibiteur et la flexibilité cognitive dans un cadre adapté aux personnes âgées.",
    durationMinutes: 6,
    questions: [
      {
        id: 1,
        text: "Quand vous lisez un texte, êtes-vous facilement distrait par des éléments de mise en page (couleurs, taille de police) ?",
        options: [
          { label: "Non, je reste concentré sur le contenu", value: 0 },
          { label: "Parfois, mais je me recentre rapidement", value: 8 },
          { label: "Souvent, cela perturbe ma lecture", value: 17 },
          { label: "Systématiquement, la mise en page m'empêche de lire", value: 25 },
        ],
      },
      {
        id: 2,
        text: "En situation de double tâche (parler au téléphone en marchant), comment vous en sortez-vous ?",
        options: [
          { label: "Sans difficulté, les deux tâches sont fluides", value: 0 },
          { label: "Correct mais je ralentis une des deux tâches", value: 8 },
          { label: "Difficulté notable, je dois m'arrêter pour une des tâches", value: 17 },
          { label: "Impossible de faire deux choses à la fois", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Quand une habitude est modifiée (nouveau chemin, nouveau rangement), combien de temps vous faut-il pour vous adapter ?",
        options: [
          { label: "Adaptation rapide en 1-2 essais", value: 0 },
          { label: "Adaptation en quelques jours", value: 8 },
          { label: "Adaptation difficile, retour fréquent à l'ancienne habitude", value: 17 },
          { label: "Très grande difficulté, l'ancienne habitude persiste", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Lors d'une conversation, arrivez-vous à ignorer les bruits de fond pour vous concentrer sur votre interlocuteur ?",
        options: [
          { label: "Oui, sans problème", value: 0 },
          { label: "Généralement oui, sauf si le bruit est très fort", value: 8 },
          { label: "Difficile, j'ai besoin d'un environnement calme", value: 17 },
          { label: "Très difficile, tout bruit perturbe ma compréhension", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Votre vitesse de réaction face aux situations imprévues a-t-elle changé avec l'âge ?",
        options: [
          { label: "Peu de changement, je réagis encore rapidement", value: 0 },
          { label: "Légèrement plus lent, mais toujours adéquat", value: 8 },
          { label: "Nettement plus lent, parfois trop tard", value: 17 },
          { label: "Très ralenti, les situations imprévues me paniquent", value: 25 },
        ],
      },
    ],
  },

  {
    id: "tmt",
    category: "elderly",
    title: "TMT — Trail Making Test (Partie A & B)",
    acronym: "TMT",
    description: "Évaluation de la vitesse de traitement, de la planification et de la flexibilité cognitive.",
    longDescription: "Le Trail Making Test (TMT) se compose de deux parties. La Partie A mesure la vitesse de traitement visuel et la coordination motrice (relier des numéros). La Partie B évalue la flexibilité cognitive en alternant entre chiffres et lettres.",
    durationMinutes: 6,
    questions: [
      {
        id: 1,
        text: "À quelle vitesse pouvez-vous relier séquentiellement des numéros dispersés sur une page (1→2→3...) ?",
        options: [
          { label: "Très rapide, moins de 30 secondes pour 25 numéros", value: 0 },
          { label: "Vitesse correcte, 30-60 secondes", value: 8 },
          { label: "Lent, 60-120 secondes avec quelques hésitations", value: 17 },
          { label: "Très lent, plus de 2 minutes ou erreurs de séquence", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Pouvez-vous repérer rapidement l'emplacement du prochain numéro dans la séquence sans parcourir toute la page ?",
        options: [
          { label: "Oui, repérage visuel rapide et efficace", value: 0 },
          { label: "Correct, avec un balayage visuel systématique", value: 8 },
          { label: "Lent, je parcours toute la page à chaque fois", value: 17 },
          { label: "Très difficile, je perds souvent le numéro suivant", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous alterner entre chiffres et lettres dans l'ordre (1-A-2-B-3-C...) sans erreur ?",
        options: [
          { label: "Oui, alternance fluide et sans erreur", value: 0 },
          { label: "Quelques hésitations mais autocorrection rapide", value: 8 },
          { label: "Erreurs fréquentes, perte de l'alternance", value: 17 },
          { label: "Incapable de maintenir l'alternance chiffre-lettre", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment est votre coordination main-œil quand vous tracez des lignes entre des points précis ?",
        options: [
          { label: "Précise et rapide, lignes droites et nettes", value: 0 },
          { label: "Correcte, quelques déviations mineures", value: 8 },
          { label: "Imprécise, tremblements ou déviations fréquentes", value: 17 },
          { label: "Très difficile, lignes très imprécises", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Quand vous travaillez sur un problème séquentiel, pouvez-vous garder en mémoire les étapes précédentes ?",
        options: [
          { label: "Oui, mémorisation fluide de la séquence", value: 0 },
          { label: "Correct pour 5-6 étapes", value: 8 },
          { label: "Difficulté au-delà de 3-4 étapes", value: 17 },
          { label: "Perte de mémoire de la séquence dès 2-3 étapes", value: 25 },
        ],
      },
    ],
  },

  {
    id: "luria-nebraska",
    category: "elderly",
    title: "Batterie de Luria-Nebraska",
    acronym: "Luria",
    description: "Évaluation neuropsychologique exhaustive des fonctions cognitives.",
    longDescription: "La Batterie Neuropsychologique de Luria-Nebraska est une évaluation complète couvrant les fonctions motrices, le rythme, les fonctions tactiles, visuelles, le langage réceptif et expressif, l'écriture, la lecture, le calcul, la mémoire et l'intelligence.",
    durationMinutes: 10,
    questions: [
      {
        id: 1,
        text: "Comment est votre motricité fine (boutonner, écrire, manipuler de petits objets) ?",
        options: [
          { label: "Précise et habile, aucune difficulté", value: 0 },
          { label: "Correcte, légère maladresse occasionnelle", value: 8 },
          { label: "Difficultés fréquentes, mouvements imprécis", value: 17 },
          { label: "Grande difficulté, incapacité pour certaines tâches fines", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Pouvez-vous reproduire un rythme (taper un pattern rythmique) après l'avoir entendu ?",
        options: [
          { label: "Oui, reproduction fidèle de rythmes complexes", value: 0 },
          { label: "Correct pour les rythmes simples à modérés", value: 8 },
          { label: "Difficultés avec les rythmes au-delà de 3-4 éléments", value: 17 },
          { label: "Incapable de reproduire même des rythmes simples", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Reconnaissez-vous des objets au toucher sans les voir (reconnaissance tactile) ?",
        options: [
          { label: "Oui, identification rapide et correcte", value: 0 },
          { label: "Correct pour les objets familiers, plus lent pour les autres", value: 8 },
          { label: "Difficultés fréquentes de reconnaissance", value: 17 },
          { label: "Incapable de reconnaître les objets au toucher", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment percevez-vous les images complexes avec des éléments superposés ou entrelacés ?",
        options: [
          { label: "Je distingue tous les éléments facilement", value: 0 },
          { label: "Correct avec un temps de traitement normal", value: 8 },
          { label: "Difficultés à séparer les éléments superposés", value: 17 },
          { label: "Confusion visuelle importante", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Comprenez-vous facilement des phrases complexes avec des structures grammaticales inhabituelles ?",
        options: [
          { label: "Oui, compréhension immédiate même des phrases complexes", value: 0 },
          { label: "Correct, parfois besoin de relecture", value: 8 },
          { label: "Difficultés avec les phrases longues ou les tournures complexes", value: 17 },
          { label: "Incompréhension fréquente, besoin de simplification", value: 25 },
        ],
      },
    ],
  },

  {
    id: "cdr",
    category: "elderly",
    title: "CDR — Clinical Dementia Rating",
    acronym: "CDR",
    description: "Évaluation de la gravité de la démence sur plusieurs domaines fonctionnels.",
    longDescription: "L'Échelle d'Évaluation Clinique de la Démence (CDR) évalue 6 domaines : mémoire, orientation, jugement et résolution de problèmes, vie communautaire, foyer et loisirs, et soins personnels. Elle permet de classer la sévérité de 0 (normal) à 3 (sévère).",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Comment décririez-vous votre mémoire au quotidien ?",
        options: [
          { label: "Aucun problème de mémoire notable", value: 0 },
          { label: "Oublis légers et constants, rappel partiel des événements", value: 8 },
          { label: "Pertes de mémoire modérées, surtout pour les événements récents", value: 17 },
          { label: "Pertes de mémoire graves, seuls les souvenirs très ancrés persistent", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment vous orientez-vous dans le temps (date, heure) et dans l'espace (lieux familiers) ?",
        options: [
          { label: "Orientation parfaite dans le temps et l'espace", value: 0 },
          { label: "Orientation correcte sauf quelques confusions temporelles", value: 8 },
          { label: "Difficultés d'orientation temporelle, spatiale parfois préservée", value: 17 },
          { label: "Désorienté le plus souvent, même dans les lieux familiers", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment gérez-vous les problèmes quotidiens (finances, planification, prise de décision) ?",
        options: [
          { label: "Résolution indépendante et jugement préservé", value: 0 },
          { label: "Légères difficultés avec les problèmes complexes", value: 8 },
          { label: "Difficultés modérées, besoin d'aide pour les décisions importantes", value: 17 },
          { label: "Incapable de porter un jugement ou de résoudre des problèmes", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment participez-vous aux activités communautaires et sociales ?",
        options: [
          { label: "Participation normale et indépendante", value: 0 },
          { label: "Légère réduction de la participation", value: 8 },
          { label: "Participation réduite, ne fonctionne pas de manière indépendante", value: 17 },
          { label: "Aucune participation significative hors du foyer", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Comment gérez-vous vos soins personnels (hygiène, habillage, alimentation) ?",
        options: [
          { label: "Totalement autonome et approprié", value: 0 },
          { label: "Légers rappels parfois nécessaires", value: 8 },
          { label: "Besoin d'aide régulière pour l'hygiène et l'habillage", value: 17 },
          { label: "Dépendance importante pour les soins personnels", value: 25 },
        ],
      },
    ],
  },

  {
    id: "clock-alzheimer",
    category: "elderly",
    title: "Test de l'Horloge (Spécifique Alzheimer)",
    acronym: "Clock-Alz",
    description: "Dépistage spécifique des patterns cognitifs associés à la maladie d'Alzheimer.",
    longDescription: "Cette version du test de l'horloge est spécifiquement conçue pour détecter les marqueurs cognitifs typiques de la maladie d'Alzheimer : désorganisation spatiale progressive, erreurs de planification, persévérations et difficultés de conceptualisation temporelle.",
    durationMinutes: 6,
    questions: [
      {
        id: 1,
        text: "Pouvez-vous dessiner un cadran d'horloge de mémoire sans modèle ?",
        options: [
          { label: "Oui, cadran complet et bien proportionné", value: 0 },
          { label: "Cadran reconnaissable avec quelques asymétries", value: 8 },
          { label: "Cadran incomplet ou très déformé", value: 17 },
          { label: "Incapable de dessiner un cadran reconnaissable", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Avez-vous des difficultés à conceptualiser la relation entre heures et position des aiguilles ?",
        options: [
          { label: "Non, la relation est claire et automatique", value: 0 },
          { label: "Quelques hésitations pour les heures complexes (ex. 10h10)", value: 8 },
          { label: "Confusion fréquente entre petite et grande aiguille", value: 17 },
          { label: "Incompréhension du concept de lecture de l'heure", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Reproduisez-vous des éléments de manière répétitive et inappropriée (persévération) ?",
        options: [
          { label: "Non, chaque élément est distinct et approprié", value: 0 },
          { label: "Très rarement, autocorrection immédiate", value: 8 },
          { label: "Parfois, répétition de chiffres ou d'éléments du dessin", value: 17 },
          { label: "Fréquemment, écriture répétitive ou dessin en boucle", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Arrivez-vous à organiser les étapes d'une tâche quotidienne dans le bon ordre (ex. préparer un repas) ?",
        options: [
          { label: "Oui, planification séquentielle sans difficulté", value: 0 },
          { label: "Généralement correct, quelques inversions d'étapes", value: 8 },
          { label: "Erreurs fréquentes dans l'ordre des étapes", value: 17 },
          { label: "Incapable de séquencer les étapes sans aide", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Avez-vous noté une détérioration progressive de votre écriture ou de vos dessins au fil du temps ?",
        options: [
          { label: "Non, écriture et dessins stables", value: 0 },
          { label: "Léger changement, écriture un peu plus petite ou tremblante", value: 8 },
          { label: "Détérioration notable, écriture difficile à lire", value: 17 },
          { label: "Détérioration importante, écriture quasi illisible", value: 25 },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CATEGORY 3: TESTS COMPATIBILITÉ DE COUPLE
  // ════════════════════════════════════════════════════════════════

  {
    id: "mbti-couple",
    category: "couple",
    title: "MBTI Couple — Compatibilité Typologique",
    acronym: "MBTI-C",
    description: "Analyse de la compatibilité en couple selon les types de personnalité Myers-Briggs.",
    longDescription: "Ce test explore la compatibilité de couple en comparant les profils MBTI des partenaires. Il examine comment les différences de type (Extraversion/Introversion, etc.) influencent la communication, la prise de décision et la vie quotidienne du couple.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Comment gérez-vous la différence de besoin social entre vous et votre partenaire (soirées vs calme) ?",
        options: [
          { label: "Nous trouvons un équilibre naturel et respectueux", value: 0 },
          { label: "Nous faisons des compromis mais avec quelques frustrations", value: 8 },
          { label: "Source de tensions régulières dans notre couple", value: 17 },
          { label: "C'est un conflit majeur non résolu", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Quand vous planifiez un voyage, vos approches (détaillée vs spontanée) sont-elles compatibles ?",
        options: [
          { label: "Oui, nous combinons nos forces naturellement", value: 0 },
          { label: "Nous nous adaptons après discussion", value: 8 },
          { label: "Nos approches s'opposent souvent", value: 17 },
          { label: "Planifier ensemble est une source constante de conflit", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment vos différences dans la prise de décision (logique vs émotionnel) impactent-elles le couple ?",
        options: [
          { label: "Elles se complètent et enrichissent nos décisions", value: 0 },
          { label: "Généralement bien gérées, quelques incompréhensions", value: 8 },
          { label: "L'un se sent souvent incompris par l'autre", value: 17 },
          { label: "Source de conflits récurrents et de frustration mutuelle", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Votre façon de percevoir le monde (détails concrets vs vision globale) crée-t-elle des malentendus ?",
        options: [
          { label: "Non, nous apprécions nos perspectives différentes", value: 0 },
          { label: "Parfois, mais nous clarifions facilement", value: 8 },
          { label: "Souvent, nous avons l'impression de ne pas parler la même langue", value: 17 },
          { label: "Constamment, la communication est très difficile", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Globalement, considérez-vous que vos différences de personnalité sont une force ou une faiblesse dans votre relation ?",
        options: [
          { label: "Une vraie force, nous nous enrichissons mutuellement", value: 0 },
          { label: "Plutôt une force, malgré quelques défis", value: 8 },
          { label: "Plutôt une faiblesse, les différences créent des tensions", value: 17 },
          { label: "Une faiblesse majeure qui menace notre relation", value: 25 },
        ],
      },
    ],
  },

  {
    id: "bigfive-couple",
    category: "couple",
    title: "Big Five Couple — Traits de Personnalité en Relation",
    acronym: "BF-Couple",
    description: "Comparaison des profils de personnalité Big Five pour évaluer la compatibilité.",
    longDescription: "Ce test compare les profils de personnalité selon le modèle Big Five pour identifier les zones de compatibilité et de friction potentielles. Il examine l'impact des différences sur 5 traits fondamentaux dans le contexte relationnel.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Vos niveaux d'ouverture aux nouvelles expériences sont-ils compatibles (l'un aime la routine, l'autre l'aventure) ?",
        options: [
          { label: "Très compatibles, nous aimons explorer ensemble", value: 0 },
          { label: "Globalement compatibles avec des ajustements", value: 8 },
          { label: "Assez différents, l'un s'ennuie pendant que l'autre s'inquiète", value: 17 },
          { label: "Très incompatibles, c'est une source constante de frustration", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Comment vos niveaux de conscienciosité (organisation, rigueur) s'harmonisent-ils au quotidien ?",
        options: [
          { label: "Bien harmonisés, nous partageons le même rythme", value: 0 },
          { label: "Quelques différences gérables (rangement, ponctualité)", value: 8 },
          { label: "Source fréquente d'irritation et de reproches", value: 17 },
          { label: "Conflit quotidien sur l'ordre, les délais, les responsabilités", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Vos niveaux d'extraversion/introversion impactent-ils votre vie sociale de couple ?",
        options: [
          { label: "Non, nous gérons bien nos différences sociales", value: 0 },
          { label: "Parfois, des négociations sur les sorties sont nécessaires", value: 8 },
          { label: "Souvent, l'un se sent isolé ou l'autre épuisé socialement", value: 17 },
          { label: "C'est un point de rupture dans notre relation", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Comment vos niveaux respectifs d'agréabilité influencent-ils la résolution de conflits ?",
        options: [
          { label: "Nous sommes tous deux bienveillants et conciliants", value: 0 },
          { label: "L'un est plus conciliant, cela équilibre les tensions", value: 8 },
          { label: "Des divergences sur la compassion et la compétition créent des frictions", value: 17 },
          { label: "L'un domine l'autre, pas de résolution constructive", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Les différences de stabilité émotionnelle (neuroticisme) affectent-elles votre relation ?",
        options: [
          { label: "Non, nous nous soutenons mutuellement dans les moments difficiles", value: 0 },
          { label: "L'un soutient l'autre, quelques épisodes de fatigue émotionnelle", value: 8 },
          { label: "La sensibilité émotionnelle de l'un pèse régulièrement sur l'autre", value: 17 },
          { label: "L'instabilité émotionnelle crée une atmosphère toxique", value: 25 },
        ],
      },
    ],
  },

  {
    id: "compatibilite-generale",
    category: "couple",
    title: "Test de Compatibilité Relationnelle Générale",
    acronym: "Compat",
    description: "Évaluation globale : communication, valeurs, gestion des conflits et projets de vie.",
    longDescription: "Ce test évalue la compatibilité globale du couple sur les dimensions fondamentales d'une relation durable : la qualité de la communication, l'alignement des valeurs, la gestion des conflits, la vision de l'avenir et l'intimité.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Comment évaluez-vous la qualité de la communication quotidienne dans votre couple ?",
        options: [
          { label: "Excellente : écoute active, expression claire des besoins", value: 0 },
          { label: "Bonne avec quelques sujets plus difficiles à aborder", value: 8 },
          { label: "Moyenne, malentendus fréquents ou non-dits", value: 17 },
          { label: "Médiocre, communication superficielle ou conflictuelle", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Vos valeurs fondamentales (religion, éducation des enfants, rôle dans la famille) sont-elles alignées ?",
        options: [
          { label: "Parfaitement alignées sur tous les sujets fondamentaux", value: 0 },
          { label: "Alignées sur l'essentiel, divergences sur des points secondaires", value: 8 },
          { label: "Divergences importantes sur 1-2 sujets fondamentaux", value: 17 },
          { label: "Profondément divergentes sur plusieurs points essentiels", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment gérez-vous les conflits et désaccords dans votre couple ?",
        options: [
          { label: "Discussion constructive, compromis mutuels", value: 0 },
          { label: "Résolution après discussion, parfois tendue", value: 8 },
          { label: "Escalade, cris ou silence prolongé fréquents", value: 17 },
          { label: "Conflits non résolus qui s'accumulent, ressentiment", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Partagez-vous une vision commune de votre avenir ensemble (5-10 prochaines années) ?",
        options: [
          { label: "Oui, nous avons des projets clairs et partagés", value: 0 },
          { label: "Globalement oui, quelques zones d'incertitude", value: 8 },
          { label: "Visions assez différentes, peu de planification commune", value: 17 },
          { label: "Visions très divergentes ou aucune réflexion commune", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Comment décririez-vous le niveau de confiance et de sécurité émotionnelle dans votre relation ?",
        options: [
          { label: "Confiance totale et sentiment de sécurité profond", value: 0 },
          { label: "Bonne confiance, quelques petites inquiétudes", value: 8 },
          { label: "Confiance fragile, doutes fréquents", value: 17 },
          { label: "Méfiance installée ou insécurité permanente", value: 25 },
        ],
      },
    ],
  },

  {
    id: "ie-couple",
    category: "couple",
    title: "Intelligence Émotionnelle en Couple (MSCEIT appliqué)",
    acronym: "IE-Couple",
    description: "Évaluation de l'intelligence émotionnelle dans le contexte de la relation de couple.",
    longDescription: "Ce test évalue comment l'intelligence émotionnelle s'exprime dans le couple : perception des émotions du partenaire, gestion émotionnelle lors des conflits, empathie mutuelle et communication émotionnelle.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Percevez-vous les changements d'humeur subtils de votre partenaire avant même qu'il/elle n'en parle ?",
        options: [
          { label: "Oui, je suis très attentif aux signaux non-verbaux", value: 0 },
          { label: "Souvent, pour les émotions les plus évidentes", value: 8 },
          { label: "Rarement, je ne remarque que les émotions très fortes", value: 17 },
          { label: "Non, je suis surpris quand mon partenaire exprime une émotion", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Lors d'un conflit, arrivez-vous à nommer et exprimer vos émotions plutôt que de réagir impulsivement ?",
        options: [
          { label: "Oui, j'exprime clairement ce que je ressens", value: 0 },
          { label: "Généralement, après un moment de recul", value: 8 },
          { label: "Difficilement, je réagis souvent sur le coup", value: 17 },
          { label: "Non, je crie, je me ferme ou je fuis le conflit", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Pouvez-vous accueillir les émotions difficiles de votre partenaire (tristesse, colère) sans vous sentir personnellement attaqué ?",
        options: [
          { label: "Oui, j'offre un espace sûr pour l'expression émotionnelle", value: 0 },
          { label: "Généralement oui, mais parfois je me sens responsable", value: 8 },
          { label: "Difficilement, je prends souvent les émotions personnellement", value: 17 },
          { label: "Non, les émotions de l'autre provoquent en moi de l'anxiété ou de la colère", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Pratiquez-vous la validation émotionnelle (reconnaître les sentiments de l'autre sans juger) ?",
        options: [
          { label: "Systématiquement, c'est un réflexe naturel", value: 0 },
          { label: "Souvent, quand je suis dans un état calme", value: 8 },
          { label: "Rarement, j'ai tendance à donner des solutions plutôt qu'à valider", value: 17 },
          { label: "Jamais, je minimise ou invalide souvent les sentiments de l'autre", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Après un conflit, êtes-vous capable de réparer émotionnellement la relation (excuses, gestes de tendresse) ?",
        options: [
          { label: "Oui, la réparation est rapide et sincère des deux côtés", value: 0 },
          { label: "Généralement, après un temps de refroidissement", value: 8 },
          { label: "Difficilement, les rancœurs persistent longtemps", value: 17 },
          { label: "Non, les conflits laissent des cicatrices durables", value: 25 },
        ],
      },
    ],
  },

  {
    id: "valeurs-croyances",
    category: "couple",
    title: "Valeurs & Croyances — Questionnaire Fondamental",
    acronym: "Valeurs",
    description: "Évaluation de la congruence des valeurs fondamentales (religion, famille, argent, carrière).",
    longDescription: "Ce questionnaire évalue l'alignement des partenaires sur les valeurs fondamentales qui influencent le plus la stabilité conjugale : vision religieuse/spirituelle, projet familial, relation à l'argent, priorités de carrière et style de vie.",
    durationMinutes: 8,
    questions: [
      {
        id: 1,
        text: "Comment gérez-vous les différences de croyances religieuses ou spirituelles dans votre couple ?",
        options: [
          { label: "Nous partageons les mêmes croyances ou respectons totalement nos différences", value: 0 },
          { label: "Des différences existent mais sont discutées ouvertement", value: 8 },
          { label: "Les différences créent des tensions sur certaines pratiques", value: 17 },
          { label: "C'est un sujet tabou ou une source de conflit majeur", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Êtes-vous d'accord sur le nombre d'enfants souhaité et les principes éducatifs fondamentaux ?",
        options: [
          { label: "Parfaitement alignés sur le projet familial", value: 0 },
          { label: "Accord global, quelques nuances à discuter", value: 8 },
          { label: "Désaccord sur le nombre d'enfants ou les principes éducatifs", value: 17 },
          { label: "Sujet jamais abordé ou profond désaccord", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Comment gérez-vous l'argent en couple (dépenses, épargne, investissements) ?",
        options: [
          { label: "Gestion transparente et harmonieuse, budget partagé", value: 0 },
          { label: "Quelques différences d'habitudes mais communication ouverte", value: 8 },
          { label: "Source de tensions régulières, manque de transparence", value: 17 },
          { label: "Conflit majeur, secret financier ou contrôle de l'un sur l'autre", value: 25 },
        ],
      },
      {
        id: 4,
        text: "L'équilibre entre carrière et vie de couple/famille est-il satisfaisant pour les deux partenaires ?",
        options: [
          { label: "Oui, nous trouvons un équilibre qui nous convient", value: 0 },
          { label: "Globalement oui, avec des périodes plus tendues", value: 8 },
          { label: "L'un sacrifie sa carrière ou le couple souffre du surmenage", value: 17 },
          { label: "Déséquilibre majeur, ressentiment ou négligence du couple", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Votre vision du style de vie idéal (lieu de vie, rythme, activités) est-elle partagée ?",
        options: [
          { label: "Oui, nous partageons la même vision du quotidien", value: 0 },
          { label: "Globalement, avec des compromis acceptés", value: 8 },
          { label: "Visions assez différentes qui créent des frustrations", value: 17 },
          { label: "Visions totalement incompatibles", value: 25 },
        ],
      },
    ],
  },

  {
    id: "communication-conflits",
    category: "couple",
    title: "Communication & Résolution de Conflits",
    acronym: "Comm-RC",
    description: "Évaluation de la qualité de la communication et de la gestion des désaccords en couple.",
    longDescription: "Ce questionnaire évalue les patterns de communication du couple, les stratégies de résolution de conflit, la capacité d'écoute mutuelle et les dynamiques de pouvoir. Basé sur les recherches de Gottman sur les couples durables.",
    durationMinutes: 7,
    questions: [
      {
        id: 1,
        text: "Quand votre partenaire exprime une critique, comment réagissez-vous typiquement ?",
        options: [
          { label: "J'écoute sans me défendre, je cherche à comprendre", value: 0 },
          { label: "J'écoute puis j'explique mon point de vue calmement", value: 8 },
          { label: "Je me défends immédiatement ou je contre-attaque", value: 17 },
          { label: "Je me ferme, je fuis ou j'explose", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Utilisez-vous le « je » ou le « tu » quand vous exprimez un mécontentement ?",
        options: [
          { label: "Toujours « je ressens... » plutôt que « tu fais toujours... »", value: 0 },
          { label: "Souvent « je », parfois « tu » dans le feu de l'action", value: 8 },
          { label: "Plutôt « tu », avec des généralisations (toujours, jamais)", value: 17 },
          { label: "Toujours « tu », accusations et reproches directs", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Après un désaccord, revenez-vous sur le sujet pour trouver une solution ou le laissez-vous en suspens ?",
        options: [
          { label: "Nous revenons toujours pour résoudre constructivement", value: 0 },
          { label: "Généralement oui, parfois le sujet est abandonné", value: 8 },
          { label: "Souvent en suspens, accumulation de non-dits", value: 17 },
          { label: "Jamais de résolution, les mêmes conflits reviennent", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Faites-vous preuve de mépris, de sarcasme ou de dédain envers votre partenaire lors des disputes ?",
        options: [
          { label: "Jamais, nous maintenons le respect même en désaccord", value: 0 },
          { label: "Très rarement, et nous nous excusons immédiatement", value: 8 },
          { label: "Parfois, le sarcasme ou l'ironie sont utilisés comme arme", value: 17 },
          { label: "Souvent, le mépris est présent dans nos échanges", value: 25 },
        ],
      },
      {
        id: 5,
        text: "Y a-t-il un équilibre de pouvoir dans la prise de décision du couple ?",
        options: [
          { label: "Oui, décisions partagées de manière égalitaire", value: 0 },
          { label: "Globalement équilibré, l'un décide plus dans certains domaines", value: 8 },
          { label: "Déséquilibré, l'un impose souvent ses choix", value: 17 },
          { label: "Très déséquilibré, domination claire de l'un des partenaires", value: 25 },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════
  // CATEGORY 4: STRESS & BIEN-ÊTRE (Test existant conservé)
  // ════════════════════════════════════════════════════════════════

  {
    id: "stress",
    category: "stress",
    title: "Évaluation du Stress & Bien-être",
    acronym: "Stress",
    description: "Évaluez votre niveau de stress quotidien, de charge mentale et d'équilibre général.",
    longDescription: "Ce questionnaire d'auto-évaluation mesure votre niveau de stress quotidien à travers quatre dimensions : la surcharge de responsabilités, la qualité du sommeil, la capacité de relaxation et les manifestations physiques du stress.",
    durationMinutes: 5,
    questions: [
      {
        id: 1,
        text: "À quelle fréquence vous sentez-vous dépassé par vos responsabilités ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Avez-vous des difficultés à vous endormir ou à rester endormi ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
      {
        id: 3,
        text: "Prenez-vous du temps pour vous détendre chaque jour ?",
        options: [
          { label: "Toujours", value: 0 },
          { label: "Souvent", value: 5 },
          { label: "Parfois", value: 15 },
          { label: "Jamais", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Ressentez-vous des tensions physiques liées au stress (dos, épaules) ?",
        options: [
          { label: "Jamais", value: 0 },
          { label: "Parfois", value: 10 },
          { label: "Souvent", value: 20 },
          { label: "Toujours", value: 25 },
        ],
      },
    ],
  },

  // Keep the old couple test as part of the couple category
  {
    id: "couple-harmonie",
    category: "couple",
    title: "Test d'Harmonie (Futurs Mariés)",
    acronym: "Harmonie",
    description: "Analysez la communication et l'alignement de vos objectifs de vie en couple.",
    longDescription: "Ce test est spécifiquement conçu pour les futurs mariés. Il évalue la qualité de la communication financière, l'alignement sur la parentalité, le niveau d'écoute mutuelle et la capacité à planifier des projets communs à long terme.",
    durationMinutes: 5,
    questions: [
      {
        id: 1,
        text: "Comment gérez-vous les désaccords sur les finances du couple ?",
        options: [
          { label: "Communication calme et ouverte", value: 0 },
          { label: "Compromis après discussion", value: 5 },
          { label: "Évitement du sujet", value: 15 },
          { label: "Arguments et tensions répétés", value: 25 },
        ],
      },
      {
        id: 2,
        text: "Partagez-vous la même vision concernant la parentalité et l'éducation ?",
        options: [
          { label: "Parfaitement alignés", value: 0 },
          { label: "Quelques divergences mineures", value: 10 },
          { label: "Désaccords importants", value: 20 },
          { label: "Sujet jamais abordé en profondeur", value: 25 },
        ],
      },
      {
        id: 3,
        text: "À quel point vous sentez-vous écouté par votre partenaire ?",
        options: [
          { label: "Toujours", value: 0 },
          { label: "Souvent", value: 5 },
          { label: "Parfois", value: 15 },
          { label: "Jamais", value: 25 },
        ],
      },
      {
        id: 4,
        text: "Planifiez-vous régulièrement des projets d'avenir communs à long terme ?",
        options: [
          { label: "Régulièrement", value: 0 },
          { label: "De temps en temps", value: 10 },
          { label: "Rarement", value: 20 },
          { label: "Jamais", value: 25 },
        ],
      },
    ],
  },
];
