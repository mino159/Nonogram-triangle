with open("whole.txt","r") as file:
    wholeFile=file.read().split(";")
print(wholeFile)
DICTIONARY={
    "row":{
        "start":{
                "/" : 3,
                "\\": 4,
                "|" : 0
        },
        "end":{
            "/" : 5,
            "\\": 2,
            "|" : 0
        }
    },
    "col":{
        "start":{
            "/" : 3,
            "\\": 2,
            "|" : 0
        },
        "end":{
            "/" : 5,
            "\\": 4,
            "|" : 0
        }
    }
}
"""
DICTIONARY={
    "row":{
        "start":{
            "/" : "/",
            "\\": "\\\\",
            "|" : "|"
        },
        "end":{
            "/" : "/",
            "\\": "\\\\",
            "|" : "|"
        }
    },
    "col":{
        "start":{
            "/" : "/",
            "\\": "\\\\",
            "|" : "-"
        },
        "end":{
            "/" : "/",
            "\\": "\\\\",
            "|" : "-"
        }
    }
}"""
def createString(list,roworcol):
    raw_parts=[part.split(" ") for part in list.split("\n")]
    print(raw_parts)
    parts=""
    for part in raw_parts:
        # print(part)
        curr_part=""
        if part==[""]:
            continue
        for num in part:
            # print("num is",num)
            str_num = ""
            str_num += str(DICTIONARY[roworcol]["start"].get(num[0]))
            str_num += str(num[1])
            str_num += str(DICTIONARY[roworcol]["end"].get(num[2]))
            curr_part+= str_num
        parts += curr_part + ","
    return parts[:-1]

rows=createString(wholeFile[0],"row")
cols=createString(wholeFile[1],"col")
with open ("converted.txt","w") as file:
    file.write(rows+";"+cols)