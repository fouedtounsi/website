import requests
import sys
from datetime import datetime
import json

class HuileDesfaxAPITester:
    def __init__(self, base_url="https://oilwood-fusion.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:500]}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:500]
                })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_olive_oil_products(self):
        """Test olive oil products endpoint"""
        success, response = self.run_test(
            "Olive Oil Products",
            "GET",
            "api/products/olive-oil",
            200
        )
        
        if success:
            # Validate response structure
            if 'products' in response and len(response['products']) == 4:
                print("   ✅ All 4 olive oil products found")
                # Check for required product IDs
                product_ids = [p['id'] for p in response['products']]
                expected_ids = ['oil-250ml', 'oil-750ml', 'oil-1l', 'oil-5l']
                if all(pid in product_ids for pid in expected_ids):
                    print("   ✅ All expected product formats present")
                else:
                    print(f"   ⚠️  Missing product formats: {set(expected_ids) - set(product_ids)}")
            else:
                print(f"   ⚠️  Expected 4 products, found {len(response.get('products', []))}")
        
        return success, response

    def test_kitchenware_products(self):
        """Test kitchenware products endpoint"""
        success, response = self.run_test(
            "Kitchenware Products",
            "GET",
            "api/products/kitchenware",
            200
        )
        
        if success:
            # Validate response structure
            if 'products' in response and len(response['products']) == 4:
                print("   ✅ All 4 kitchenware products found")
                # Check for required product IDs
                product_ids = [p['id'] for p in response['products']]
                expected_ids = ['classic-cup', 'cutting-board', 'flat-mortar', 'heart-dish']
                if all(pid in product_ids for pid in expected_ids):
                    print("   ✅ All expected kitchenware products present")
                else:
                    print(f"   ⚠️  Missing products: {set(expected_ids) - set(product_ids)}")
            else:
                print(f"   ⚠️  Expected 4 products, found {len(response.get('products', []))}")
        
        return success, response

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "company": "Test Company",
            "subject": "Test Subject",
            "message": "This is a test message for the contact form functionality."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        
        if success:
            if response.get('success') and response.get('id'):
                print("   ✅ Contact form submitted successfully with ID")
                return success, response
            else:
                print("   ⚠️  Response missing success flag or ID")
        
        return success, response

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        # Test missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": "short"  # Too short message
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        
        return success, response

    def test_get_contact_messages(self):
        """Test getting contact messages (admin endpoint)"""
        return self.run_test(
            "Get Contact Messages",
            "GET",
            "api/contact",
            200
        )

def main():
    print("🚀 Starting Huile de Sfax API Tests")
    print("=" * 50)
    
    # Setup
    tester = HuileDesfaxAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic API tests
    tester.test_api_root()
    tester.test_health_check()
    
    # Product endpoints
    tester.test_olive_oil_products()
    tester.test_kitchenware_products()
    
    # Contact form tests
    tester.test_contact_form_submission()
    tester.test_contact_form_validation()
    tester.test_get_contact_messages()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            if 'error' in test:
                print(f"   - {test['name']}: {test['error']}")
            else:
                print(f"   - {test['name']}: Expected {test.get('expected')}, got {test.get('actual')}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())