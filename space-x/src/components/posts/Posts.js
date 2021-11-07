import React from 'react';
import { Grid, Card, CardActions , CardMedia, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Posts = ({posts}) => {
    return (
        <Grid  container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
            <Grid key={post.flight_number} item xs={12} md={3}>
                <Card >
                    <CardMedia component = "img" image = {post.links.mission_patch_small} alt = {post.mission_name} />
                    <Typography variant={'h6'} > {post.mission_name}#{post.flight_number} </Typography>
                    {post.mission_id.length !== 0 ? (
                        <>
                            <p>Mission Ids: </p>
                            <List>
                                {post.mission_id.map( (id) => (
                                    <ListItem>
                                        <ListItemIcon>
                                            <FiberManualRecordIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary = {id}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )  : (
                        <>
                        </>
                    )}
                    <Typography> Launch Year : {post.launch_year} </Typography>
                    <Typography> Succesful Launch : {post.launch_success ? "True" : "False"} </Typography> 
                </Card>
            </Grid>
            ))}
        </Grid>
    );
};

export default Posts;