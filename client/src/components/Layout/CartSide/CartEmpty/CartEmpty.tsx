import { useDispatch } from 'react-redux';
import './CartEmpty.scss';
import { toggleCartVisible } from '../../../../redux/reducers/userReducer';

const CartEmpty = () => {
    const dispatch = useDispatch()

    const handleGoBackClick = () => {
        dispatch(toggleCartVisible())
    }

    return (
        <div className="cart-side__empty">
            <img src="/img/cart-empty.png" alt="cart empty" />
            <p className='cart-side__empty-title'>Корзина пустая</p>
            <p className='cart-side__empty-description'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button className="cart-side__empty-button" onClick={handleGoBackClick}>
                <img src="/img/cart-side-arrow-left-button.svg" alt="" />
                Вернуться назад
            </button>
        </div>
    )
}

export default CartEmpty