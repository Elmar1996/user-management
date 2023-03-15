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
import { ReactComponent as FilterIcon } from "assets/icons/filter.svg";
import { useNotifications } from "redux/NotificationsContext";

type CategoriesActionsProps = {
  categorySelected: boolean;
  showEditButton: boolean;
  selectedId: string;
  setSelected: (string) => void;
  selected: string[];
  openFilterDialog: () => void;
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
  setSelected,
  openFilterDialog,
  selected,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const { confirm, notify } = useNotifications();
  return (
    <Root>
      <Page title="Users">
        <ManagerPageHeader title="Users">
          {isMobile ? (
            <>
              {categorySelected && (
                <Tooltip title="Delete" arrow>
                  <IconButton
                    sx={{ color: "error.light", ml: 3 }}        
                    onClick={() =>
                      confirm({
                        onConfirm() {
                          dispatch(deleteUser({ ids: selected }));
                          setSelected([]);
                          notify({
                            message: "User Deleted Successfully",
                            type: "success",
                          });
                        },
                        confirmText: "Are you sure?",
                        description: "Selected users will be deleted",
                      })
                    }
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              )}
              {showEditButton && (
                <Tooltip title="Edit" arrow>
                  <Link to={`/users/edit/${selectedId}`}>
                    <IconButton sx={{ ml: 3 }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              <Tooltip title="Filter" arrow>
                <IconButton sx={{ ml: 3 }} onClick={openFilterDialog}>
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="+ Add user" arrow>
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
                  onClick={() =>
                    confirm({
                      onConfirm() {
                        dispatch(deleteUser({ ids: selected }));
                        setSelected([]);
                        notify({
                          message: "User Deleted Successfully",
                          type: "success",
                        });
                      },
                      confirmText: "Are you sure?",
                      description: "Selected users will be deleted",
                    })
                  }
                  className={clsx("button", "delete-button")}
                >
                  Delete
                </Button>
              )}
              {showEditButton && (
                <Link to={`/users/edit/${selectedId}`}>
                  <Button startIcon={<EditIcon />} className="button">
                    Edit
                  </Button>
                </Link>
              )}
              <Button
                startIcon={<FilterIcon />}
                className="button"
                onClick={openFilterDialog}
              >
                Filter
              </Button>
              <Link to={"/users/create"}>
                <Button color="secondary" variant="contained" sx={{ ml: 3 }}>
                  + Add user
                </Button>
              </Link>
            </>
          )}
        </ManagerPageHeader>
      </Page>
    </Root>
  );
};
