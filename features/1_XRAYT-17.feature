@REQ_XRAYT-17
Feature: Configure apartment
	#As a client user it should be possible to enter the basic data of an apartment to create an order.
	#I shouldn't be able to configure an apartment with less than 4 rooms.

	#I want to test that if filling in all the mandatory details, I can complete the configuration of an apratment
  @TEST_XRAYT-62 @Apartment @Order
  Scenario Outline: Configure apartment (5th iteration)
    Given I am not logged in
    When I login as an object manager
    And I click on the button "create order"
    And I enter "str" into the search box
    And I choose an apartment from the list
    And I enter <rooms> as the number of rooms
    And I enter <bathroom> as the bathroom area
    And I enter <kitchen> as the kitchen area
    Then I expect the configurator button to be in the state "<state>"
    When I click on the button "Complete configuration"
    Then I am redirected to the page "<page>"

    Examples:
      | rooms | bathroom | kitchen | state    | page               |
      | 5     | 5.20     | 4.89    | active   | shop view          |
      | 2     | 5.00     | 6.01    | inactive | basic configurator |
      | 18    | 2.88     | 5.67    | inactive | basic configurator |
      | 13    | 8.88     | 7.17    | inactive | basic configurator |