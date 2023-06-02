import { FC } from 'react';
import './Header.scss';
import { useSelector } from 'react-redux';
import CartSide from '../CartSide/CartSide';
import { useDispatch } from 'react-redux';
import { toggleCartVisible } from '../../../redux/reducers/userReducer';
import { Link } from 'react-router-dom';

const Header: FC = () => {
    const dispatch = useDispatch();
    const { cartIsOpen, auth } = useSelector((store: any) => store.user);
    const { cartSum } = useSelector((store: any) => store.store);

    const handleOpenCartClick = () => {
        dispatch(toggleCartVisible());
    };
    return (
        <>
            {cartIsOpen && <CartSide />}
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                            <img
                                width={40}
                                height={40}
                                src="/img/logo.png"
                                alt=""
                            />
                            <Link to={'/'}>
                                <div className="header__logo-text">
                                    <h3>REACT SNEAKERS</h3>
                                    <p>Магазин лучших кроссовок</p>
                                </div>
                            </Link>
                        </div>

                        <div className="header__actions">
                            <div
                                className="header__actions-cart"
                                onClick={handleOpenCartClick}
                            >
                                <img height={17} src="/img/cart.svg" alt="" />
                                <span>
                                    {cartSum
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ' '
                                        )}{' '}
                                    руб.
                                </span>
                            </div>
                            <img
                                height={19}
                                className="header__actions-favorite"
                                src="/img/heart.svg"
                                alt="favorite"
                            />
                            <Link to={auth.isLoggedIn ? '/profile' : '/auth'}>
                                <img
                                    height={20}
                                    className="header__actions-profile"
                                    src="/img/profile-icon.svg"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
