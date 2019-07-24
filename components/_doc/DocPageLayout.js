import Grid     from '@material-ui/core/Grid';
import List     from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper    from '@material-ui/core/Paper';
import React    from 'react';

import wrapper from '../../lib/componentWrapper';
import Link    from '../common/Link';


const styles = theme => ({

  link: {
    ...theme.styles.hover.offLinkUnderline,
  },

  link__active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },

  stickyMenu: {
    position: 'sticky',
    top: theme.spacing(3),
  },

  mdContent: {
    fontFamily: theme.typography.fontFamily,
    '&> h1': {
      marginBottom: theme.spacing(8),
    },
    '&> h2': {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(6),
    },
    '&> h3': {
      marginTop: theme.spacing(4),
    },
    '& pre': {
      overflow: 'scroll',
      maxWidth: '90vw',
    },
    '& * code, & pre': {
      background: '#000',
      color: theme.palette.text.white,
      padding: 2,
      '&.language-shell': {
        lineHeight: 2,
      },
    },
    '& p, & * p, & * li': {
      'line-height': '1.5em',
    },
    '& table, & * table': {
      borderCollapse: 'collapse',
      border: `1px solid ${theme.palette.grey[200]}`,
      '& td, & tr, & th': {
        border: `1px solid ${theme.palette.grey[200]}`,
        padding: theme.spacing(0.5),
      },
    },
  },
});



class DocPageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.routes = [];
    Object.keys(props.routes).forEach(routeName => {
      if (routeName.indexOf('/_doc') === 0) {
        this.routes.push(routeName);
      }
    });

    this.state = {
      readme: this.getDocFile(),
    };
  }


  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({
        readme: this.getDocFile(),
      });
    }
  }


  getDocFile() {
    try {
      const camelToSnake = require('../../../tools/camelToSnake');
      return require(`../../../doc/${this.props.lang}/${camelToSnake(this.props.name).toUpperCase()}.md`);
    } catch (err) {
      throw new Error(err);
    }
  }


  render() {
    const { classes, t = e => e } = this.props;

    return (
      <Grid container spacing={5} className={classes.root}>
        <Grid item md={3}>
          <Paper className={classes.stickyMenu}>
            <List component="nav">
              {
                this.routes.map((route, key) => (
                  <ListItem key={route}>
                    <Link to={route} className={classes.link} activeClassName={classes.link__active}>
                      {key + 1}. {t(`_doc.routes.${route}`)}
                    </Link>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>

        <Grid item md={9}>
          <div dangerouslySetInnerHTML={{ __html: this.state.readme }} className={classes.mdContent}/>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}



const mapStateToProps = state => ({
  routes: state.app.routes,
  lang: state.app.lang,
});

export default wrapper(DocPageLayout, { styles, mapStateToProps, withRouter: true });