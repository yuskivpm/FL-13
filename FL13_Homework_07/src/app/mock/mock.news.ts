import { News } from '../interfaces/News';
import { NewsSource } from '../interfaces/NewsSource';

export const NEWS: News[] = [
  {
    id: 1,
    sourceId: 1,
    heading: `Esther Salas case: 'Feminazi' rants of lawyer who shot judge's family`,
    description: `A lawyer who shot dead a female judge's son before turning the gun on himself had ranted online about "Feminazi rule"`,
    content: `Roy Den Hollander gunned down Judge Esther Salas' son in New Jersey on Sunday and badly wounded her husband.
The gunman dressed as a FedEx delivery man before opening fire at their North Brunswick home, police said.
Den Hollander wrote on his website that the jurist was "a lazy and incompetent Latina judge appointed by Obama".
A package addressed to Judge Salas was found inside his car, sources said.`,
    date: new Date(2020, 6, 15),
    author: 'Soutik Biswas',
    imageUrl: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/5F2D/production/_113556342_mediaitem113556339.jpg',
  },
  {
    id: 2,
    sourceId: 1,
    heading: `Coronavirus: Big choices for EU leaders on recovery billions`,
    description: `When the leaders of the EU27 gather in Brussels on Friday be prepared for the shock of the familiar`,
    content: `Although of course that doesn't mean they'll see eye to eye.
Expect plenty of face masks and plenty of displays of social distancing to go along with the rather obvious political distancing ` +
      `which has emerged in the long months of lockdown.`,
    date: new Date(2020, 6, 16),
    author: 'Kevin Connolly',
    imageUrl: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/BD9C/production/_113404584_merkel.jpg',
  },
  {
    id: 3,
    sourceId: 2,
    heading: `The AN-225: How the Cold War created the world's largest airplane`,
    description: `A favorite of plane spotters around the world`,
    content: `The first powered plane flight, performed by the Wright Brothers over the windswept beach of North Carolina's Kitty Hawk ` +
      `in 1903, covered 120 feet. That historic flight would fit entirely in the cargo hold of the Antonov AN-225 Mriya, the world's ` +
      `biggest fully operational plane.
Powered by six turbofan engines and with a wingspan almost the length of a football field, this gentle giant of the skies can carry ` +
      `bigger and heavier cargo than any other plane, and is unique in the world of aviation, as just one was ever built.`,
    date: new Date(2020, 6, 20),
    author: 'Jacopo Prisco',
    imageUrl: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1100,c_fill,g_auto,h_619,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200707180719-an225-landing.jpg',
  },
  {
    id: 4,
    sourceId: 2,
    heading: `'Things could get very ugly': Experts fear post-election crisis as Trump sets the stage to dispute the results in November`,
    description: `Interviews with nearly 20 election experts`,
    content: `Washington (CNN)Voting experts and political strategists from across the political spectrum are increasingly alarmed about ` +
      `the potential for a disputed presidential election in November, one in which one candidate openly questions the legitimacy of the ` +
      `results or even refuses to concede.
These experts are keenly aware of President Donald Trump's well-documented history of lying about voter fraud and claiming that elections` +
      ` were "rigged" when he doesn't like the outcome. They also see a Democratic base that is still burned from 2016, when its nominee` +
      ` was dragged down in part by Russian meddling operation, won the popular vote, and lost to Trump.`,
    date: new Date(2020, 6, 21),
    author: 'Marshall Cohen',
    imageUrl: 'https://cdn.cnn.com/cnnnext/dam/assets/200609220917-02-georgia-voting-0609-exlarge-169.jpg',
  },
];

export const SOURCES: NewsSource[] = [
  { id: 1, name: 'BBC' },
  { id: 2, name: 'CNN' },
];
