import { NavLink } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTheme } from '../features/theme/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav__link nav__link--active' : 'nav__link';

  return (
    <header className="header">
      <div className="header__brand">
        <p className="header__title">Mini Library</p>
      </div>

      <nav className="nav" aria-label="Điều hướng chính">
        <NavLink to="/" className={navClass} end>
          Sách
        </NavLink>
        <NavLink to="/stats" className={navClass}>
          Thống kê
        </NavLink>
      </nav>

      <div className="header__actions">
        <Button
          variant="ghost"
          onClick={toggleTheme}
          aria-label="Đổi giao diện sáng tối"
          title="Đổi giao diện sáng tối"
        >
          {theme === 'light' ? 'Tối' : 'Sáng'}
        </Button>
      </div>
    </header>
  );
}
