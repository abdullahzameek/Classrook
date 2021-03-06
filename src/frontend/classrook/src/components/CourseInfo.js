import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import CourseCard from "./CourseCard";
import { Grid } from "@material-ui/core";
import CourseInfoCard from "./CourseInfoCard";
import ReviewCard from './ReviewCard';
import CreateReview from './CreateReview';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class CourseInfo extends Component{
  constructor(props){
    super(props)
    console.log("here are the props")
    console.log(this.props)
    this.state = { 
    courseInfo : [],
    reviews : [],
    filesView : false
    }
  }
  
  componentDidMount = () => {
    const id = this.props.match.params.id
    sessionStorage.setItem("course_id",this.props.match.params.id)
    axios.post('http://localhost:8000/get_exact_course/', {id})
        .then(response => {
            console.log(response.data)
            this.setState({
                courseInfo: response.data
            })
        })
        .catch(error => {
            console.log("ERROR in Category loading ", error)
        })
    axios.post('http://localhost:8000/review_by_course_id/', {id})
    .then(response => {
        console.log(response.data)
        this.setState({
            reviews: response.data
        })
    })
    .catch(error => {
        console.log("ERROR in Category loading ", error)
    })

  }


  handleClick = () => {
      console.log(this.state.courseInfo)
      console.log("here are the reviews")
      console.log(this.state.reviews)
  }

  handleUploadClick = () => {
    this.setState({
        filesView : true
    })
    console.log("upload clicked")
  }

    returnTheme = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#2E3B55',
            },
        },
    });
    return theme    
    }

  showUpload = () => {
    const theme = this.returnTheme()
    const styles = {
    preview: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: '#2E3B55',
        color: 'white',
        '&:hover': {
            background: '#586481',
        },
    }
}
     return <Button onClick={this.handleUploadClick} className={styles.preview}> View Files </Button>
  }


  render(){
    if(this.state.filesView){
        return (<Redirect to={`/majors/${this.state.courseInfo.category}/${this.state.courseInfo.id}/files`} />)
    }
    return(
        <>
        <Grid container direction="column">
        <Grid item>
            <CourseInfoCard {...this.state.courseInfo} />
        </Grid>
        {this.showUpload()}
        <Grid item>
            <CreateReview />
        </Grid>
        <Grid item>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Grid>
        <Grid item container justify="center" alignItems="center">
        <Grid item xs={false} sm={2} />
        <Grid container spacing={8}>
            {this.state.reviews.map(contentCardObj => 
                <Grid item xs={12} sm={4}>
                <ReviewCard {...contentCardObj} />
            </Grid>
            )}
        </Grid>
      </Grid>
      </Grid>
        </>
    );
  }
}

  
export default withStyles(useStyles)(CourseInfo);




