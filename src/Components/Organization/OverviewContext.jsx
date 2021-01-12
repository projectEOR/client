import { RateReviewSharp } from '@material-ui/icons';
import React from 'react'

export const OverviewContext = React.createContext({  getContent:()=>{},
                                                      getOrgs:()=>{},
                                                      getSenior:()=>{}  
});
function childFinder(member,list){
    var children=[];
    list.forEach((ratee) => {
        if(ratee.rater_id===member.id && ratee!==member){
            children.push(ratee)
            childFinder(ratee,list);
        }
    })
    return children;
}
function orgTreeSort(members,rater){
    var tree=rater;
    tree.children=[]
    console.log(tree)
    members.forEach((ratee) => {
        if(ratee.rater_id===rater.id && ratee.id!==rater.id){
            tree.children.push(orgTreeSort(members,ratee))
            
            
        }
    })
    return tree;

}
export default class OverviewProvider extends React.Component{
    state={ unitmembers:false,
            unitchildren:false,
            currentorg: 1,
            orgs: false,
            senior: false,
            orgtree: false
        }
    async componentDidMount(){
        var orgfetch=await fetch('http://localhost:4000/profiles/orgs')
        orgfetch= await orgfetch.json()
        this.setState({orgs: orgfetch})
        var orgmembers=await fetch(`http://localhost:4000/overview/${this.state.currentorg}`)
        orgmembers=await orgmembers.json();
        console.log(orgmembers)
        var orgchildren=await fetch(`http://localhost:4000/overview/children/${this.state.currentorg}`)
        orgchildren=await orgchildren.json();
        this.setState({unitmembers: orgmembers});
        this.setState({unitchildren: orgchildren});
        var seniorid=await fetch(`http://localhost:4000/overview/sr/${this.state.currentorg}`)
        seniorid=await seniorid.json();
        var senior=await fetch(`http://localhost:4000/profiles/user/${seniorid[0].rater_id}`)
        senior=await senior.json();
        console.log('Senior Rater:',senior)
        this.setState({senior: senior});
        var orgtreemeta=[orgTreeSort(this.state.unitmembers,this.state.senior)]
        this.setState({orgtree: orgtreemeta[0]})
        console.log(orgtreemeta)
    }    
    async getContent(org_id){
            var orgmembers=await fetch(`http://localhost:4000/overview/${org_id}`)
            orgmembers=await orgmembers.json();
            var orgchildren=await fetch(`http://localhost:4000/overview/children/${org_id}`)
            orgchildren=await orgchildren.json();
            this.setState({unitmembers: orgmembers});
            this.setState({unitchildren: orgchildren});
        }
    async getOrgs(){
        var orgfetch=await fetch('http://localhost:4000/profiles/orgs')
        orgfetch= await orgfetch.json()

        return orgfetch
    }

    async getSenior(org_id){
        var senior=await fetch(`http://localhost:4000/overview/sr/${org_id}`)
        senior=await senior.json();
        this.setState({senior: senior});
    }
    // formEntryHandler(e){
    //     this.setState({[e.target.name]: e.target.value})
    //}
    render(){
        return(
            <OverviewContext.Provider value={{   state:   this.state,
                                                    getContent: this.getContent.bind(this),
                                                    getOrgs: this.getOrgs.bind(this),
                                                    getSenior: this.getSenior.bind(this)
//                                                    formEntryHandler:this.formEntryHandler()
                                        }}>
            {this.props.children}                                
            </OverviewContext.Provider>
        )
    }
}