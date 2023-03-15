import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import clsx from "clsx";
import { Link, ManagerPageHeader, Page } from "components";
import { useDispatch } from "react-redux";
import { deleteUser } from "redux/user-slice";
import browserHistory from "utils/browser-utils";

type CategoriesActionsProps = {
  categorySelected: boolean;
  showEditButton: boolean;
  selectedId: string;
  setSelected: (string) => void;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
  "& .button": {
    marginLeft: theme.spacing(3),
    boxShadow: theme.shadows[1],
    color: theme.palette.primary.main,
  },
  "& .delete-button": {
    color: theme.palette.error.main,
  },
  "& .MuiBox-root": {
    display: "flex",
  },
}));

export const UsersActions: React.FC<CategoriesActionsProps> = ({
  categorySelected,
  showEditButton,
  selectedId,
  setSelected
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const dispatch = useDispatch()
  return (
    <Root>
      <Page title="dvmkdvmk">
        <ManagerPageHeader title="svsvsv">
          {isMobile ? (
            <>
              {categorySelected && (
                <Tooltip title="delete" arrow>
                  <IconButton
                    sx={{ color: "error.light", ml: 3 }}
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     deleteCategory({ variables: { deleteCategoryId: selectedId } });
                    //     setSelected((state) => state.filter((id) => id !== selectedId));
                    // }}
                    onClick={() => dispatch(deleteUser({id:selectedId}))}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              )}
              {showEditButton && (
                <Tooltip title="edit" arrow>
                  <Link to={`/users/edit/${selectedId}`}>
                    <IconButton sx={{ ml: 3 }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              <Tooltip title="newCategory" arrow>
                <IconButton
                  sx={{ ml: 3 }}
                  onClick={() => browserHistory.push("/users/create")}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              {categorySelected && (
                <Button
                  startIcon={<TrashIcon />}
                  onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteUser({id:selectedId}))
                      setSelected([])
                  }}
                  className={clsx("button", "delete-button")}
                
                >
                  delete
                </Button>
              )}
              {showEditButton && (
                <Link to={`/users/edit/${selectedId}`}>
                  <Button startIcon={<EditIcon />} className="button">
                    Redaktə et
                  </Button>
                </Link>
              )}
              <Link to={"/users/create"}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ ml: 3 }}
                  href=""
                >
                  newCategory
                </Button>
              </Link>
            </>
          )}
        </ManagerPageHeader>
      </Page>
    </Root>
  );
};
