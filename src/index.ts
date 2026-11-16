import './global.css';
import { el } from './helpers/fabric-elemnt';
const body = document.querySelector('body');
const main = el('main', {}, 'Hello');
body?.append(main);
