import { useEffect, useState } from 'react';
import './CardsList.scss';
import ShopCart from '../../Common/ShopCard/ShopCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadItems } from '../../../redux/reducers/storeReducer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardsList = () => {
    const [searchValue, setSearchValue] = useState('');
    const { items, isLoading } = useSelector((store: any) => store.store);
    const cartItems = useSelector((store: any) => store.store.cartItems);
    const favoriteItems = useSelector(
        (store: any) => store.store.favoriteItems
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadItems());
    }, []);
    return (
        <div className="card-list">
            <div className="container">
                <div className="card-list__inner">
                    <div className="card-list__header">
                        <div className="card-list__title">Все кроссовки</div>
                        <div className="card-list__search">
                            <img src="/img/search-icon.svg" alt="" />
                            <input
                                type="text"
                                onChange={(e) =>
                                    setSearchValue(e.currentTarget.value)
                                }
                                placeholder="Поиск..."
                            />
                        </div>
                    </div>
                    <div
                        className="card-list__content"
                        data-random={favoriteItems.length}
                    >
                        {(items.length > 0 && !isLoading) ? (
                            items
                                .filter((e: any) =>
                                    e.title
                                        .toUpperCase()
                                        .includes(searchValue.toUpperCase())
                                )
                                .map((e: any) => (
                                    <ShopCart
                                        id={e.id}
                                        title={e.title}
                                        key={e.id}
                                        price={e.price}
                                        img={e.img}
                                        isLiked={
                                            !favoriteItems.every(
                                                (m: any) => m.id !== e.id
                                            )
                                        }
                                        isAdded={
                                            !cartItems.every(
                                                (m: any) => m.id !== e.id
                                            )
                                        }
                                    />
                                ))
                        ) : (
                            <>
                                <Skeleton className='card-list__skeleton' count={20} inline={true} containerClassName='card__list__skeleton-wrapper'/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsList;
