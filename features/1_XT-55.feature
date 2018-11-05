@REQ_XT-55
Feature:User Login
	#To be able to use the system a user needs to be able to login. A user should be able to login with valid credentials only. When entering bad credentials access should be denied. When login attempts fail too often a text box should be displayed where the user is offered help, either by email or contact form.

	@TEST_XT-63
	Scenario: Login page should be reachable
		Given I am not logged in
		When I access the login page
		Then I should see a field "Benutzername"
		And I should see a field "Kennwort"
		And I should see a button "Anmelden"
