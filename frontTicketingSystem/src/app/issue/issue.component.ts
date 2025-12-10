import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue',
  imports: [FormsModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})

export class IssueComponent {
  showInput = false; //will only triggered when its true (when createIssue is clicked)
  moveInput = false;
  
  newIssueTitle = ''; //for input
  issueStatus = ''; //for input


  //array to append
  issues: {title: string} [] = [];

  createIssue (){ //will only fire/show form once clicked
    this.showInput = true;

  
  }
  saveIssue() { //will hide again once button of saveIssue is clickeds
    this.issues.push ({title: this.newIssueTitle})
    console.log("Appended:", this.newIssueTitle);
    
    this.showInput = false;
    this.newIssueTitle;
    this.moveInput = false;
    this.issueStatus;

    //this will push to the array
    this.issues.push({
      title: this.newIssueTitle,   
    });

    console.log("this will be appended: ", this.newIssueTitle); //this is where it will store 
    
    this.newIssueTitle;


  }

  moveIssue() {
    console.log("Where to move?");
    this.moveInput = true;
  }

}
