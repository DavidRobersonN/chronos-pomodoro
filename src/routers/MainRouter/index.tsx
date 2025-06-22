import { BrowserRouter, Route, Routes } from 'react-router';
import { AboutPomodoro } from '../../components/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Home } from '../../pages/Home';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-pomodoro/' element={<AboutPomodoro />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
