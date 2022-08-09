import { fireEvent, render, screen } from '@testing-library/react';
import DestinationSearch from './DestinationSearch';
import { act } from 'react-dom/test-utils';
import userEvent, { user } from "@testing-library/user-event";
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { BrowserRouter } from 'react-router-dom';

const mockDestination = (uid) => {
    return {
        uid,
        term: uid.toString(),
    };
}

const destinationsList = [{"term":"Abc", "uid":"A1BC"}, 
                            {"term":"Def", "uid":"D2EF"},
                            {"term":"Ghi", "uid":"G3hi"},
                            {"term":"Gjk", "uid":"G4jk"}]


// ========================= DestinationSearch: Display Expected Output Tests ============================= //


test("DestinationSearch: Display None", async () => {
    // expect.assertions(16);

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
      
            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);

    //console.log(screen.debug());


    const destinationCard_Abc = screen.queryAllByTestId("destinationCard_Abc");
    expect(destinationCard_Abc.length).toBe(0);
    const destinationCard_Def = screen.queryAllByTestId("destinationCard_Def"); 
    expect(destinationCard_Def.length).toBe(0);
    const destinationCard_Ghi = screen.queryAllByTestId("destinationCard_Ghi"); 
    expect(destinationCard_Ghi.length).toBe(0);
    const destinationCard_Gjk = screen.queryAllByTestId("destinationCard_Gjk"); 
    expect(destinationCard_Gjk.length).toBe(0);




});






test("DestinationSearch: Display Expected Output Test 1", async () => {
    // expect.assertions(16);

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("A");

        
    })

    await act(async () => {
        rendered.unmount;   // Must have somehow to actually rerender properly. 
        rendered.rerender;
    })
    

    

    //console.log("rerendered: ", screen.debug());

    const destinationCard_Abc = screen.getAllByTestId("destinationCard_Abc");
    expect(destinationCard_Abc.length).toBe(1);
    //expect(destinationCard_Abc).toBeInDocument()

    const destinationCard_Def = screen.queryAllByTestId("destinationCard_Def"); 
    expect(destinationCard_Def.length).toBe(0);
    const destinationCard_Ghi = screen.queryAllByTestId("destinationCard_Ghi"); 
    expect(destinationCard_Ghi.length).toBe(0);
    const destinationCard_Gjk = screen.queryAllByTestId("destinationCard_Gjk"); 
    expect(destinationCard_Gjk.length).toBe(0);





    //console.log("ls is: ", ls);
    //expect(ls.length).toBe(1);

    // for (let i = 0; i < 15; i++) {
    //     expect(ls[i].innerHTML).toBe(i.toString());
    // }


});





test("DestinationSearch: Display Expected Output Test 2", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("D");

        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })
    

    

    //console.log("rerendered: ", screen.debug());

    const destinationCard_Abc = screen.queryAllByTestId("destinationCard_Abc");
    expect(destinationCard_Abc.length).toBe(0);

    const destinationCard_Def = screen.getAllByTestId("destinationCard_Def"); 
    expect(destinationCard_Def.length).toBe(1);

    const destinationCard_Ghi = screen.queryAllByTestId("destinationCard_Ghi"); 
    expect(destinationCard_Ghi.length).toBe(0);
    const destinationCard_Gjk = screen.queryAllByTestId("destinationCard_Gjk"); 
    expect(destinationCard_Gjk.length).toBe(0);

  
});





test("DestinationSearch: Display Expected Output Test 3a", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("G");

        
    })

    await act(async () => {
        rendered.unmount;
        rendered.rerender;
    })
    

    

    //console.log("rerendered: ", screen.debug());

    const destinationCard_Abc = screen.queryAllByTestId("destinationCard_Abc");
    expect(destinationCard_Abc.length).toBe(0);
    const destinationCard_Def = screen.queryAllByTestId("destinationCard_Def"); 
    expect(destinationCard_Def.length).toBe(0);

    const destinationCard_Ghi = screen.getAllByTestId("destinationCard_Ghi"); 
    expect(destinationCard_Ghi.length).toBe(1);
    const destinationCard_Gjk = screen.getAllByTestId("destinationCard_Gjk"); 
    expect(destinationCard_Gjk.length).toBe(1);

  
});





test("DestinationSearch: Display Expected Output Test 3b", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("Gh");

        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })
    

    

    //console.log("rerendered: ", screen.debug());

    const destinationCard_Abc = screen.queryAllByTestId("destinationCard_Abc");
    expect(destinationCard_Abc.length).toBe(0);
    const destinationCard_Def = screen.queryAllByTestId("destinationCard_Def"); 
    expect(destinationCard_Def.length).toBe(0);

    const destinationCard_Ghi = screen.getAllByTestId("destinationCard_Ghi"); 
    expect(destinationCard_Ghi.length).toBe(1);

    const destinationCard_Gjk = screen.queryAllByTestId("destinationCard_Gjk"); 
    expect(destinationCard_Gjk.length).toBe(0);
  
});


// ========================= DestinationSearch: Display Expected Output Tests ============================= //





// ========================= DestinationSearch: Selection Tests ============================= //

test("DestinationSearch: Selection Test 1 (Single Selection)", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }


    let selectedInfo = {};
    const getSelected = (selected) =>{
        selectedInfo = selected;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag
        testGetSelected = {getSelected}             // Under handleChoice()

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("A");

    });

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });

    await act(async ()=>{

        const choice = screen.getByTestId("destinationCard_Abc");
        // fireEvent.change(input, { target: { value: "1" } });

        userEvent.click(choice);

    })

    expect(selectedInfo).toStrictEqual({"term":"Abc", "uid":"A1BC"});
    
});



test("DestinationSearch: Selection Test 2 (Changing of Selection)", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }


    let selectedInfo = {};
    const getSelected = (selected) =>{
        selectedInfo = selected;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag
        testGetSelected = {getSelected}             // Under handleChoice()

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("fuzzyInput");
        // fireEvent.change(input, { target: { value: "1" } });
        input.focus();

        userEvent.keyboard("A");

        

    });

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });

    await act(async ()=>{

        const choice = screen.getByTestId("destinationCard_Abc");
        // fireEvent.change(input, { target: { value: "1" } });

        userEvent.click(choice);

        expect(selectedInfo).toStrictEqual({"term":"Abc", "uid":"A1BC"});

        const input = screen.getByTestId("fuzzyInput");

        input.focus();

        userEvent.clear(input);

        userEvent.keyboard("G");

    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    });


    await act(async ()=>{

        let choice = screen.getByTestId("destinationCard_Ghi");
        // fireEvent.change(input, { target: { value: "1" } });

        userEvent.click(choice);

        expect(selectedInfo).toStrictEqual({"term":"Ghi", "uid":"G3hi"});

        choice = screen.getByTestId("destinationCard_Gjk");
  
        userEvent.click(choice);

    })
  
    expect(selectedInfo).toStrictEqual({"term":"Gjk", "uid":"G4jk"});

 
});


// ========================= DestinationSearch: Selection Tests ============================= //






// ========================= DestinationSearch: Calls of Backend for New Data Tests ============================= //

test("DestinationSearch: Number of Rooms Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }


    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("numberOfRoomsTest");    // In FilterBar.js

        input.focus();

        userEvent.keyboard("2");

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        filterBarSubmitButton.focus();
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })


    expect(calledBackend).toBe(true);

});






test("DestinationSearch: Checkin Date Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);
    
    

    await act(async ()=>{

        const input = screen.getByTestId("checkInDateTest");        // In FilterBar.js

        input.focus();
        //userEvent.keyboard("03102022");
        fireEvent.mouseDown(input);
        fireEvent.change(input, {target: {value:"2022-10-03"}})

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        filterBarSubmitButton.focus();
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })

    expect(calledBackend).toBe(true);

});





test("DestinationSearch: Checkout Date Submission Calls Backend for New Data", async () => {

    let calledBackend = false;
    const getTestBoolForBackend = (backendBool) => {
        calledBackend = backendBool;
    }

    let rendered = render(<BrowserRouter><DestinationSearch
        backendPackage={{
            // getDestinationsByFuzzyString: async (searchWord) => {
            //     console.log([1, 6, 3, 14, 16, 71, 14].map(mockDestination));
            //     return [1, 6, 3, 14, 16, 71, 14].map(mockDestination);

            getDestinationsByFuzzyString: (searchWord) => {
                return destinationsList
            }
        }}

        test = {1}
        testData = {destinationsList}
        testBoolForBackend = {getTestBoolForBackend}   // Inserted into <FilterBar ... > tag

    /></BrowserRouter>);

    await act(async ()=>{

        const input = screen.getByTestId("checkOutDateTest");        // In FilterBar.js

        input.focus();
        fireEvent.mouseDown(input);
        fireEvent.change(input, {target: {value:"2022-10-03"}})

        const filterBarSubmitButton = screen.getByTestId("filterBarSubmitButton");
        filterBarSubmitButton.focus();
        userEvent.click(filterBarSubmitButton);
        
    })

    await act(async () => {
        rendered.unmount; // Must have somehow to actually rerender properly.
        rendered.rerender;
    })



    

    expect(calledBackend).toBe(true);

}); 

// ========================= DestinationSearch: Calls of Backend for New Data Tests ============================= //















// test('renders learn react link', () => {
//   render(<DestinationSearch />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('Transform Uppercase', () =>{
//   expect(UpperCaseChange("SINGAPORE")).toBe("singapore");

// });

// Arrays
test('India should be in destination' , ()=>{
  const destination = ['Singapore', 'Finland', 'India'];
  expect(destination).toContain('India');
});

// Test if Function Exist
test("DestinationSearch", () => {
  expect(DestinationSearch).toBeDefined();
});





// // Promise
// test('Destination fetched name should be India', () => {
//   expect.assertions(1);  // MUST HAVE
//   return getDestinationsByFuzzyString.fetchRoom()
//   .then( data => {
//     expect(data.name).toEqual('India');
//   });
// });

// // Async Await
// test('Destination fetched name should be India'), async () => {
//   expect.assertions(1);  // MUST HAVE
//   const data = await getDestinationsByFuzzyString.fetchRoom()
  
//   expect(data.name).toEqual('india');

// });
