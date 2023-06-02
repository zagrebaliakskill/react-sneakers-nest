import { useDispatch} from 'react-redux';
import './ShopCard.scss';
import { addItemToCart, addItemToFavorite, changeCartSum, removeItemFromCart, removeItemFromFavorite } from '../../../redux/reducers/storeReducer';
import { memo } from 'react';

type Props = {
    id: number;
    title: string;
    price: number;
    img: string;
    isAdded: boolean;
    isLiked: boolean;
}

const ShopCard = ({id, title, price, img, isAdded, isLiked}: Props) => {
    const dispatch = useDispatch()

    const handleClickToCard = () => {
        if (isAdded) {
            dispatch(removeItemFromCart(id))
            dispatch(changeCartSum(-price))
        } else {
            dispatch(changeCartSum(price))
            dispatch(addItemToCart({id, img, title, price}))
        }
    }

    const handleClickToLike = () => {
        if (isLiked) {
            dispatch(removeItemFromFavorite(id))
        } else {
            dispatch(addItemToFavorite({id, img, title, price}))
        }
    }

    return (
        <> 
            <div className={`card__wrapper${isAdded ? " card__wrapper--active" : ""}`}>
                
                <img onClick={handleClickToLike} src={isLiked ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="heart liked" className="card__heart" />

                <img width={133} height={112} src={img} alt="item" className="card__item-photo" />

                <p className="card__item-title">
                    {title}
                </p>

                <div className='card__item-bottom'>
                    <div className='card__item-price'>
                        <p className='card__item-price-title'>Цена:</p>
                        <p className='card__item-price-number'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</p>
                    </div>
                    <img onClick={handleClickToCard} className='card__item-plus' height={32} width={32} src={isAdded ? "/img/cart-added.svg" : "/img/cart-plus.svg"} alt="" />
                </div>
            </div>
        </>
    )
}

export default memo(ShopCard);