import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: 'shikimori-stat.ivanik.ru',
  apiHost: 'https://plausible.ivanik.ru',
  trackLocalhost: false
});

export function trackPageView(props) {
    plausible.trackPageview({props})
}

export function trackEvent(name, props) {
    plausible.trackEvent(name, {props})
}
