import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import './navbar.scss';

const MENU_ITEMS = [
	{text: 'Speakers', link: '/speakers'},
	{text: 'Organizers', link: '/organisers'},
	{text: 'Events', link: '/events'},
	{text: 'Blog', link: ''},
	{text: 'About Us', link: '/about'},
];

export default function navbar() {
	return (
		<div>
			<div className='navigation'>
				<Link className='link' to='/'>
					<div className='navigation__logo'>
						<img src={Logo} alt='Speakspire Logo' />
					</div>
				</Link>

				<div className='navigation__menu'>
					{MENU_ITEMS.map((menuItem, index) => (
						<Link className='link' to={menuItem.link} key={index}>
							<div className='navigation__menu__item --item'>{menuItem.text}</div>
						</Link>
					))}

					<Link className='link' to='/login'>
						<div className='navigation__menu__item --outlinedbutton'> Sign In </div>
					</Link>

					<Link className='link' to='/category'>
						<div className='navigation__menu__item --filledbutton'> Sign Up</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
