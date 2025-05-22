import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box wide",
            position: "bottom left",
            equalWeightButtons: true,
            flipButtons: true
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    // Nécessaire pour que CookieConsent sache qu'il doit gérer le Google Consent Mode
     autoDetectServices: true, // Ou configurer les services manuellement

    // Configuration du Consent Mode par défaut (avant que l'utilisateur ne fasse un choix)
    // Il est recommandé de tout mettre à 'denied' par défaut pour être conforme au RGPD
    consentDefaults: {
        'analytics_storage': 'denied',
    },
    categories: {
        necessary: {
            readOnly: true,
            enabled: true
        },
        analytics: {
            enabled: false,
            autoClear: {
                cookies: [
                    { name: /^_ga/, }, // Pour Google Analytics
                    { name: /^_gid/, },
                    { name: /^_gat/, },
                    ]
                },
            // Important pour le Google Consent Mode
                services: {
                    googleAnalytics: { // Nom arbitraire pour votre service
                        label: 'Google Analytics',
                        onAccept: () => {
                            // N'est plus forcément nécessaire de faire gtag('consent', 'update'...) ici
                            // si autoDetectServices est bien géré ou si vous utilisez
                            // la configuration des services dans GTM comme expliqué plus bas.
                            // CookieConsent devrait mettre à jour le consent mode automatiquement.
                        },
                        onRevoke: () => {
                            // Idem
                        },
                        // La liaison avec GCM se fait via les clés comme 'analytics_storage'
                        // qui sont mises à jour par CookieConsent.
                    }
                }
        }
    },
    language: {
        default: "fr",
        autoDetect: "browser",
        translations: {
            fr: {
                consentModal: {
                    title: "Bonjour voyageur, c'est l'heure des cookies!",
                    description: "Vert-Menthe utilise des cookies strictement nécessaires et, avec votre accord, des cookies de mesure d’audience.",
                    closeIconLabel: "",
                    acceptAllBtn: "Tout accepter",
                    acceptNecessaryBtn: "Tout rejeter",
                    showPreferencesBtn: "Gérer les préférences",
                    footer: "<a href=\"#link\">Politique de confidentialité</a>\n<a href=\"#link\">Termes et conditions</a>"
                },
                preferencesModal: {
                    title: "Préférences de cookies",
                    closeIconLabel: "Fermer la fenêtre",
                    acceptAllBtn: "Tout accepter",
                    acceptNecessaryBtn: "Tout rejeter",
                    savePreferencesBtn: "Sauvegarder les préférences",
                    serviceCounterLabel: "Services",
                    sections: [
                        {
                            title: "Utilisation des Cookies",
                            description: "Vert-menthe utilise des cookies techniques strictement nécessaires et des cookies fonctionnels pour un outil d'analyse statistique."
                        },
                        {
                            title: "Cookies Strictement Nécessaires <span class=\"pm__badge\">Toujours Activé</span>",
                            description: "Ces cookies sont nécessaires pour des raisons purement techniques. Sans eux, vous ne pouvez pas accéder au site. Etant donné leur caractère nécessaire, seule une obligation d'information s'applique. Ces cookies sont installés dès que vous accédez au site Internet.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Cookies pour Outil d'analyse",
                            description: "Ces cookies alimentent un outil statistique nous permettant de savoir combien de fois une page du site a été consultée. Nous utilisons ces informations pour améliorer l'expérience utilisateur et le contenu du site Internet. Cet outil n’est utilisé que si vous consentez à son placement.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Plus d'informations",
                            description: "Pour plus d'informations sur la politique de cookies de Vert-menthe, vous pouvez consulter <a class=\"cc__link\" href=\"https://www.vert-menthe.fr/mentions-legales\">les mentions légales</a>."
                        }
                    ]
                }
            }
        }
    }
});
