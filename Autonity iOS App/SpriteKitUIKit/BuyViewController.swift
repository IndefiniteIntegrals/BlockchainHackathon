//
//  BuyViewController.swift
//  SpriteKitUIKit
//
//  Created by Abhay Sidhwani on 18/12/17.
//  Copyright © 2017 Rickey Hrabowskie. All rights reserved.
//

import UIKit

class BuyViewController: UIViewController,UITableViewDelegate,UITableViewDataSource{
    var myjson:NSArray!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        let url = URL(string :"http://192.168.0.10:7200/api/v1/sellInfo")!
        let alert = UIAlertController(title: nil, message: "Please wait...", preferredStyle: .alert)
        
       
        let task = URLSession.shared.dataTask(with: url){(data,response,error) in
            if error != nil {
                print("Error 404 Result Not Found")
                
            }
            else {
                
                if let content = data {
                    do{
                        self.myjson = try JSONSerialization.jsonObject(with: content, options: JSONSerialization.ReadingOptions.mutableContainers) as! NSArray
                        print(self.myjson)
                        
                    }
                    catch{
                        
                    }
                }
            }
        }
        task.resume()
    }

        let a = ["audi","city","fortuner","cruze"]
    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    {
        sleep(3);
        print(myjson.count)
        return (myjson.count)
    }
    
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
    {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! BuyviewcontrollerTableViewCell
        
        
        var m = myjson?[indexPath.row] as? NSDictionary
        cell.mylabel.text = m!["carID"]! as? String
        cell.uniqueid.text = m!["uniqueID"]! as? String
        return cell
    }
    

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    

}
