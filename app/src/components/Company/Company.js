import React, { useState } from 'react';

const Company = () => {

    function displayFields(id){

        document.getElementById("txtCompanyID").value = document.getElementById("td_CompanyID" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtCompanyName").value = document.getElementById("td_CompanyName" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtAbbrivation").value = document.getElementById("td_CompanyAbbr" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;			
        document.getElementById("txtLogo").value = document.getElementById("td_Logo" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtCompanyAddress").value = document.getElementById("td_Address" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtContactPerson").value = document.getElementById("td_ContactPerson" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtContactNo").value = document.getElementById("td_ContactPhone" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
        document.getElementById("txtContactDetail").value = document.getElementById("td_ContactDetail" +id.substring(id.lastIndexOf("_"),id.length)).innerHTML;
    } 

    function BrowseImage(){
      if(document.getElementById("btnImage").value == ""){
        document.getElementById("btnImage").click();
      }
    }

    function getimgSelectedValue(){

      if(document.getElementById("btnImage").value != ""){
        //alert(document.getElementById("btnImage").value  );
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("imgBox").src = e.target.result;
        document.getElementById("txtLogo").value = document.getElementById("btnImage").files[0].name;
      }       
      reader.readAsDataURL(document.getElementById("btnImage").files[0]);
    }

    function setFieldforAdd(){

      document.getElementById("txtCompanyID").value = "";
      document.getElementById("txtCompanyName").value = "";
      document.getElementById("txtAbbrivation").value =  "";
      document.getElementById("txtLogo").value = "";
      document.getElementById("txtCompanyAddress").value = "";
      document.getElementById("txtContactPerson").value = "";
      document.getElementById("txtContactNo").value = "";
      document.getElementById("txtContactDetail").value = "";
      document.getElementById("txtCompanyName").focus();
    }

    function SaveCompany(){
      var companyName = document.getElementById("txtCompanyName").value;
      var companyAbbrv = document.getElementById("txtAbbrivation").value;
      var companyLogo = document.getElementById("txtLogo").value;
      var companyAddress = document.getElementById("txtCompanyAddress").value;
      var companyContactPerson = document.getElementById("txtContactPerson").value;
      var companyContactNo = document.getElementById("txtContactNo").value;
      var companyContactDetail = document.getElementById("txtContactDetail").value;

    }

    const [name, setName] = useState("Default Name");

    return (
/*
        <div>
            <input type="text" value={name} onChange={(event) => {setName(event.target.value)}} />
            <button onClick={(event) => {myAlert(name)}}>Save</button>
        </div>
*/

    <section className="forms">
      <div className="container-fluid">
        <header> 
          <h1 className="h3 display"> Add Edit Company            </h1>
        </header>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <h4>Form</h4>
              </div>
              <div className="card-body">
                  <p></p>
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>ID</label>
                      </div>
                      <div className="col-sm-10">
                        <input tabindex="1" disabled="true" id="txtCompanyID" type="Company ID" placeholder="Company ID" className="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Name</label>
                      </div>
                      <div className="col-sm-10">
                        <input tabindex="2" id="txtCompanyName" type="Company Name" placeholder="Company Name" className="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Abbrivation</label>
                      </div>
                      <div className="col-sm-10">
                        <input tabindex="3" id="txtAbbrivation" type="Company Abbrivation" placeholder="Company Abbrivation" className="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div className="form-group row">
						          <div className="col-sm-2"> 
							          <label>Logo</label>
						          </div> 							
						          <div className="col-sm-6">
							          <div className="form-group">
							            <div className="input-group">
			  					          <input id="txtLogo" type="text" placeholder="Logo Path" className="form-control"/>
								            <div className="input-group-append">
                              <button type="button" onClick={() => {BrowseImage();}} className="btn btn-primary">Browse</button>
                              <input tabindex="4" id="btnImage" type="file" onChange={(event) =>{getimgSelectedValue();}} className="hidden"/>
								            </div>
							            </div>
							          </div>
							        </div>
                      <div className="col-sm-4">
                        <img tabindex="5" id="imgBox" src="img/brand/elastix_logo_mini.png" className="img-fluid"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Address</label>
                      </div>
                      <div className="col-sm-10">
                        <textarea tabindex="6" id="txtCompanyAddress" type="Company Address" placeholder="Company Address" className="form-control form-control-warning"></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Contact Person</label>
                      </div>
                      <div className="col-sm-10">
                        <input tabindex="7" id="txtContactPerson" type="Contact Person" placeholder="Contact Person" className="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Contact No</label>
                      </div>
                      <div className="col-sm-2">
					              <input tabindex="8" id="txtCountryCode" value = "+92" disabled="true" className="form-control form-control-warning"/>
					            </div>
                      <div className="col-sm-8">
						            <input tabindex="9" id="txtContactNo"  type="Contact Number" placeholder="Contact Number" className="form-control form-control-warning"/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2"> 
                        <label>Contact Detail</label>
                      </div>
                      <div className="col-sm-10">
                        <textarea tabindex="10" id="txtContactDetail" type="Contact Detail" placeholder="Contact Detail" className="form-control form-control-warning"></textarea>
                      </div>
                    </div>

                    <div className="form-group row">       
                      <div className="col-sm-10 offset-sm-2">
                        <input tabindex="11" onClick={() =>{setFieldforAdd();}} type="button" value="Add" className="btn btn-primary"/>
                        <input tabindex="12" type="button" value="Edit" className="btn btn-primary"/>
                        <input tabindex="13" onClick={() => {SaveCompany();}} type="button" value="Save" className="btn btn-primary"/>
                        <input tabindex="14" type="button" value="Delete" className="btn btn-primary"/>
                      </div>
                    </div>

                  </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header d-flex align-items-center">
			    <h4>Grid</h4>
			  </div>
              <div className="card-body">
              <table id="datatable1" style={{width: "100%"}} className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th	className="hidden" >Abbrivation</th>
                      <th	className="hidden" >Logo</th>
                      <th	className="hidden" >Address</th>
                      <th	className="hidden" >Contact Person</th>
                      <th	className="hidden" >Phone</th>
                      <th	className="hidden" >Detail</th>
                    </tr>
                  </thead>
                  <tbody>

                    
                  
                    <tr id="tr_0001" onClick={() => displayFields("tr_0001")}>
                      <td id="td_CompanyID_0001">comp0001</td>
                      <td id="td_CompanyName_0001">Tranz-Life Pvt Limited</td>						
                      <td className="hidden" id="td_CompanyAbbr_0001">TL</td>
                      <td className="hidden" id="td_Logo_0001">..\Images\td_CompanyID_0001.jpg</td>
                      <td className="hidden" id="td_Address_0001">Main Manzar-e-Alam Road NKCHS Karachi</td>
                      <td className="hidden" id="td_ContactPerson_0001">Ali Imran</td>
                      <td className="hidden" id="td_ContactPhone_0001">3451234567</td>
                      <td className="hidden" id="td_ContactDetail_0001">Tranz-Life Head Office Karachi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    )
}

export default Company;
