class decision {
    constructor(id, text, children, choices = false, moreInfo = "", first = false) {
        this.id = id; 
        this.text = text; 
        this.children = children;
        this.choices = choices;
        this.moreInfo = moreInfo;
        this.first = first;
    }
}
//main decision tree
const dictMain = new decision(0,
    "Economical and marketability aspects to consider for your project",
    [
        new decision(1,
            "Idea novelty",
            [
                new decision(4,
                    "Is core of your idea completely new?",
                    [
                        new decision(5,
                            "Yes",
                            [
                                new decision(7,"Could you consider IP?",
                                    [
                                        new decision(8,"<i class='fa fa-solid fa-check'></i>", null)
                                    ]
                                )
                            ]
                        ),
                        new decision(6,
                            "No",
                            [
                                new decision(9,"Can you change it to be novel?",
                                    [
                                        new decision(10,"Yes", [
                                            new decision(12,"Could you consider IP?",
                                                [
                                                    new decision(13,"<i class='fa fa-solid fa-check'></i>", null)
                                                ]
                                            )
                                        ]),
                                        new decision(11,"No",
                                            [
                                                new decision(14,"Can you add an aspect that adds novelty?",
                                                    [
                                                        new decision(15,"Yes",
                                                            [
                                                                
                                                                new decision(17,"Could you consider IP?",
                                                                    [
                                                                        new decision(18,"<i class='fa fa-solid fa-check'></i>", null)
                                                                    ]
                                                                )
                                                                
                                                            ]
                                                        ),
                                                        new decision(16,"No",
                                                            [
                                                                new decision(19,"<i class='fa fa-solid fa-trash'></i>", null)
                                                            ]
                                                        )
                                                    ],
                                                    true
                                                )
                                            ]
                                        )
                                    ],
                                    true,
                                    "info on another thing"
                                )
                            ]
                        )
                    ],
                    true
                )
            ],
            false,
            "this is more info"
        ),
        new decision(2,
            "System efficiency",
            []
        ),
        new decision(3,
            "Economic feasibility",
            []
        ),
    ],
    false,
    '',
    true
)

function dec(dict, level) {
    // set type of choice
    if (dict.choices || dict.children == null) {
        x = document.createElement("p");
    } else {
        x = document.createElement("button");
        x.id = dict.id;
        x.className = "btn";
        if (dict.text == "Yes"){ // green button
            x.classList.add("btn-success");
        } else if (dict.text == "No"){ //red button
            x.classList.add("btn-danger");
        } else {
            x.classList.add("btn-primary");
        }
    }
    x.innerHTML = dict.text; //set text of element
    x.classList.add(level);
    document.getElementById("tree").appendChild(x);

    if (dict.first){
        br = document.createElement('br');
        document.getElementById("tree").appendChild(br);
    }
    // add more info in other div
    if (dict.moreInfo.length > 0){
        document.getElementById("moreInfo").innerHTML = dict.moreInfo;
    }

    x.onclick = function () {
        //change color of button when clicked to follow the picked path
        btn = document.getElementById(dict.id)
        btn.classList.remove("btn-primary");
        btn.classList.remove("btn-success");
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-info"); //light blue

        if (dict.children != null) {
            for (val of dict.children) {
                dec(val, level)
                if (val.choices) {
                    for (vals of val.children) {
                        dec(vals, level)
                    }
                }
            }
        }
        //disable level that is clicked
        Array.from(document.getElementsByClassName(level-1)).forEach(element => {
            element.disabled = true;
        });
        br = document.createElement('br');
        document.getElementById("tree").appendChild(br);
        
    }
    level++;
}

window.onload = function () {
    const level = 0
    dec(dictMain, level);
    
    document.getElementById("reset").onclick = function(){
        document.getElementById("tree").innerHTML = '';
        document.getElementById("moreInfo").innerHTML = '';
        dec(dictMain, 0);
    };
}