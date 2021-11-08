import React from 'react';
import cx from 'clsx';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

import useStyles from './styles';


const Posts = ({posts}) => {
    const styles = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    return (
        <Grid  container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
            <Grid key={post.flight_number} item xs={12} md={3}>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardMedia
                        className={cx(styles.media, mediaStyles.root)}
                        image={ post.links.mission_patch_small } alt = {post.mission_name}
                    />
                    <CardContent>
                        <TextInfoContent
                            heading={post.mission_name + "#" + post.flight_number}
                            body={ 'Mission IDs:' }
                        />
                        <List dense={true}>
                            {post.mission_id.map( (id) => (
                                <ListItem key = {id} disableGutters >
                                    <ListItemIcon>
                                        <ArrowForwardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary = {id} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography>
                        Launch Year : {post.launch_year}
                        </Typography>
                        <Typography>
                        Successful Launch : {post.launch_success ? "True" : "False"}
                        </Typography>
                        <Typography>
                        Successful Landing : 
                        </Typography>
                    </CardContent>
                    </Card>
            </Grid>
            ))}
        </Grid>
    );
};

export default Posts;