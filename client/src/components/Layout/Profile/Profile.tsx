import './Profile.scss';

const Profile = () => {
    return (
        <>
            <div className="profile">
                <div className="container">
                    <div className="profile__inner">
                        <ul className="profile__navbar-list">
                            <li className="profile__navbar-list-item">
                                <a
                                    href="#"
                                    className="profile__navbar-list-link"
                                >
                                    Последнии покупки
                                </a>
                            </li>
                            <li className="profile__navbar-list-item">
                                <a
                                    href="#"
                                    className="profile__navbar-list-link"
                                >
                                    Статистика
                                </a>
                            </li>
                            <li className="profile__navbar-list-item">
                                <a
                                    href="#"
                                    className="profile__navbar-list-link"
                                >
                                    Настройки
                                </a>
                            </li>
                        </ul>
                        <div className="profile__content">Какой-то контент</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
