import './global.css';
import { createSearchPage } from '@/app/ui/home';

const app = createSearchPage();

document.body.append(app.element);
