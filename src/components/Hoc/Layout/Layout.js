import './Layout.css';
import Header from '../../Header/Header'
import Sidebar from '../../Sidebar/Sidebar';

const Layout = props => {
    return (
        <div className='Layout'>
            <Sidebar />
            <div className='LeftContainer'>
                <Header />
                <div className='Content'>
                    {props.children}
                </div>
            </div>
        </div>

    );
};

export default Layout;
