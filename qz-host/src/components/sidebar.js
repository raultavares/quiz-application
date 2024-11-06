import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = () => {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        if (!open) {
            setOpen(false);
        }
    }, []);

    return (
        <div className="">
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer className='sidebar' open={open} onClose={toggleDrawer(false)} >

            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText className='list-text' primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to="/create-quiz" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AutoAwesomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Quiz" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/present-quiz" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SlideshowIcon />
                            </ListItemIcon>
                            <ListItemText primary="Present Quiz" />
                        </ListItemButton>
                    </ListItem>
                </Link>

            </Drawer>

        </div>
    );
};

export default Sidebar;
