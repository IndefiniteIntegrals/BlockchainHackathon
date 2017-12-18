//
//  sellViewController.swift
//  SpriteKitUIKit
//
//  Created by Abhay Sidhwani on 18/12/17.
//  Copyright © 2017 Rickey Hrabowskie. All rights reserved.
//

import UIKit

class sellViewController: UIViewController,UITextFieldDelegate {
    
    @IBOutlet weak var name: UITextField!
    
    @IBOutlet weak var email: UITextField!
    
    @IBOutlet weak var userid: UITextField!
    
    @IBOutlet weak var vehiclereg: UITextField!
    
    @IBOutlet weak var ScrollView: UIScrollView!
    
    @IBAction func Sell(_ sender: UIButton) {
        
        
        let url = URL(string :"http://192.168.0.10:7200/api/v1/sell?uniqueID=\(userid.text!)&carID=\(vehiclereg.text!)")!
        let alert = UIAlertController(title: nil, message: "Please wait...", preferredStyle: .alert)
        
        let loadingIndicator = UIActivityIndicatorView(frame: CGRect(x: 10, y: 5, width: 50, height: 50))
        loadingIndicator.hidesWhenStopped = true
        loadingIndicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.gray
        loadingIndicator.startAnimating();
        alert.view.addSubview(loadingIndicator)
        self.present(alert, animated: true, completion: nil)
        let task = URLSession.shared.dataTask(with: url){(data,response,error) in
            if error != nil {
                print("Error 404 Result Not Found")
                self.dismiss(animated: false, completion: nil)
            }
            else {
                self.dismiss(animated: false, completion: nil)
                if let content = data {
                    do{
                        let myjson = try JSONSerialization.jsonObject(with: content, options: JSONSerialization.ReadingOptions.mutableContainers) as AnyObject
                        self.dismiss(animated: false, completion: nil)
                    }
                    catch{
                        
                    }
                }
            }
        }
        task.resume()
        
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        assignbackground()
        self.hideKeyboardWhenTappedAround()
        self.name.delegate = self
        self.email.delegate = self
        self.userid.delegate = self
        self.vehiclereg.delegate = self
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    func assignbackground(){
        let background = UIImage(named: "sellcar")
        
        var imageView : UIImageView!
        imageView = UIImageView(frame: view.bounds)
        imageView.contentMode =  UIViewContentMode.scaleAspectFill
        imageView.clipsToBounds = true
        imageView.image = background
        imageView.center = view.center
        view.addSubview(imageView)
        self.view.sendSubview(toBack: imageView)
    }
    func textFieldDidBeginEditing(_ textField: UITextField) {
        
        switch textField.tag {
        case 1...2:
            textField.keyboardType = .emailAddress
            
        case 3...4 :
            ScrollView.setContentOffset(CGPoint(x : 0,y : 75), animated: true)
            textField.keyboardType = .default
        default :
            print("Do Nothing")
        }
    }
    func textFieldDidEndEditing(_ textField: UITextField) {
        ScrollView.setContentOffset(CGPoint(x : 0, y : 0), animated: true)
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        switch textField.tag {
        case 1:
            email.becomeFirstResponder()
        case 2:
            userid.becomeFirstResponder()
        case 3:
            vehiclereg.becomeFirstResponder()
        
        default :
            textField.resignFirstResponder()
            
        }
        return true
    }
    
}
extension UIViewController {
    func hideKeyboardWhenTappedAround() {
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIViewController.dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }
    
    func dismissKeyboard() {
        view.endEditing(true)
    }
}
