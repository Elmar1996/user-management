import { Box, TableContainer, Theme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { User } from "redux/user-slice";
import { UsersActions } from './users-action';


const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(3.5),
    },
    '& .table-container': {
        marginBottom: theme.spacing(2),
    },
    '& .MuiTableCell-root': {
        padding: `${theme.spacing(1)} !important`,
    },
    '& .category-icon': {
        '& svg': {
            width: '50px',
            height: '50px',
        },
    },
}));

export type Categories = {
    Id: string;
    Category: string;
    ParentCategory: string;
    Icon: string;
    Image: string;
};

export type Action = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const UsersTable: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const users = useSelector((state: { users: User[] }) => state.users);
  
    const isSelected = (Id: string) => selected.indexOf(Id) !== -1;

    const handleClick = (Id: string) => {
        const selectedIndex = selected.indexOf(Id);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, Id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = users?.map((user) => `${user.id}`);
            setSelected(newSelecteds || []);
            return;
        }
        setSelected([]);
    };

  



    return (
        <Root>
            <UsersActions
                setSelected={setSelected}
                selectedId={selected[0]}
                categorySelected={selected.length > 0}
                showEditButton={selected.length === 1}
            />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    color="primary"
                                    // checked={
                                    //     categories && categories?.length > 0 && selected.length === categories?.length
                                    // }
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>username</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>phone </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user, i) => {
                            const isItemSelected = isSelected(user.id + "");

                            return (
                                <TableRow
                                hover
                                onClick={() => handleClick(user.id + "")}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={user.id}
                                selected={isItemSelected}
                                >
                                    <TableCell align="right">
                                        <Checkbox  color="primary" checked={isItemSelected} />
                                    </TableCell>
                                    <TableCell align="right"> {user.name}</TableCell>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.phone}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Root>
    );
};
